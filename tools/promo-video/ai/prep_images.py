"""
받은 그림 정리 — 그림 편(@birfoiz_ 방식)마다 쓰는 도구라 게시 후에도 남긴다.

  .venv/Scripts/python.exe -I ai/prep_images.py public/ai/<편> src/<편>/screens.json k02,k16

- kNN.png/jpg/webp → kNN.webp (1080×1920 으로 꽉 채워 자름)
- 세 번째 인자의 초록 장면: 초록 화면을 뚫은 kNN-keyed.png + 화면 자리(기울어진 사각형 네 꼭짓점)를 screens.json 에
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

W, H = 1080, 1920
src_dir = Path(sys.argv[1])
screens_path = Path(sys.argv[2])
GREEN = set(sys.argv[3].split(",")) if len(sys.argv) > 3 else set()


def cover(im: Image.Image) -> Image.Image:
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    left = (im.width - W) // 2
    top = (im.height - H) // 2
    return im.crop((left, top, left + W, top + H))


def quad_of(mask: np.ndarray) -> list[list[int]]:
    ys, xs = np.nonzero(mask)
    pts = np.stack([xs, ys], 1).astype(float)
    c = pts.mean(0)
    vals, vecs = np.linalg.eigh(np.cov((pts - c).T))
    major = vecs[:, np.argmax(vals)]  # long side of the phone screen
    if major[1] < 0:
        major = -major
    minor = np.array([major[1], -major[0]])
    if minor[0] < 0:
        minor = -minor
    a = (pts - c) @ minor  # across (x-ish)
    b = (pts - c) @ major  # along (y-ish)
    a0, a1 = np.percentile(a, [0.5, 99.5])
    b0, b1 = np.percentile(b, [0.5, 99.5])
    corner = lambda u, v: (c + u * minor + v * major).round().astype(int).tolist()
    return [corner(a0, b0), corner(a1, b0), corner(a1, b1), corner(a0, b1)]  # tl tr br bl


screens = json.loads(screens_path.read_text(encoding="utf-8")) if screens_path.exists() else {}
for f in sorted(src_dir.iterdir()):
    if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"} or "-keyed" in f.stem or not f.stem.startswith("k"):
        continue
    if f.suffix.lower() == ".webp" and (src_dir / f"{f.stem}.png").exists():
        continue
    im = cover(Image.open(f).convert("RGB"))
    im.save(src_dir / f"{f.stem}.webp", quality=90)
    msg = f"{f.name} -> {f.stem}.webp"
    if f.stem in GREEN:
        rgb = np.asarray(im).astype(int)
        r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
        mask = (g > 120) & (g > r + 50) & (g > b + 50)
        alpha = np.where(mask, 0, 255).astype(np.uint8)
        rgba = np.dstack([np.asarray(im), alpha])
        Image.fromarray(rgba, "RGBA").save(src_dir / f"{f.stem}-keyed.png")
        if mask.sum() > 2000:
            screens[f.stem] = {"quad": quad_of(mask)}
            msg += f" + keyed, quad {screens[f.stem]['quad']} ({int(mask.sum())} px)"
        else:
            msg += " + keyed, NO GREEN FOUND"
    print(msg)
screens_path.write_text(json.dumps(screens, indent=2) + "\n", encoding="utf-8")
