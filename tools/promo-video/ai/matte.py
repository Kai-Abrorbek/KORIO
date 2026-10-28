"""
사람만 오려 내기 — 직접 찍은 영상의 배경을 바꿀 때 (Robust Video Matting, 노트북 GPU).

    .venv/Scripts/python.exe ai/matte.py <입력 영상> <출력> [--bg <그림 파일 | #rrggbb>] [--model resnet50|mobilenetv3] [--ratio 0.25]

  출력이 .webm → 배경이 투명한 영상. Remotion 에서 <OffthreadVideo transparent> 로 다른 배경 위에 겹친다.
  출력이 .mp4  → --bg 그림(화면을 꽉 채우게 늘림)이나 색 위에 합친 영상.
  소리는 원본 그대로 옮긴다.

  --model  resnet50(기본, 가장자리가 더 깔끔) · mobilenetv3(빠름)
  --ratio  모델이 보는 해상도 비율. 비우면 화면 크기에 맞춘다 (1080p 이상 0.25, 720p 0.375, 그보다 작으면 0.5)

준비 (한 번): python -m venv .venv → .venv 에 torch(cu124) · numpy, 모델은 ai/models/rvm_*_fp32.torchscript
(공식 배포: github.com/PeterL1n/RobustVideoMatting releases v1.0.0)
"""

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

import numpy as np
import torch

ROOT = Path(__file__).resolve().parent


def probe(path: str) -> tuple[int, int, str, bool]:
    info = json.loads(
        subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate", "-of", "json", path],
            capture_output=True, check=True, text=True,
        ).stdout
    )
    video = next(s for s in info["streams"] if s["codec_type"] == "video")
    has_audio = any(s["codec_type"] == "audio" for s in info["streams"])
    return int(video["width"]), int(video["height"]), video["r_frame_rate"], has_audio


def background(spec: str | None, width: int, height: int, device: torch.device) -> torch.Tensor:
    """배경 텐서 (1, 3, H, W), 0..1. 그림은 화면을 꽉 채우게 잘라 늘린다"""
    if not spec:
        spec = "#2F6E55"
    if spec.startswith("#"):
        rgb = [int(spec[i : i + 2], 16) / 255 for i in (1, 3, 5)]
        return torch.tensor(rgb, device=device).view(1, 3, 1, 1).expand(1, 3, height, width)
    raw = subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-i", spec, "-vf", f"scale={width}:{height}:force_original_aspect_ratio=increase,crop={width}:{height}",
         "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True, check=True,
    ).stdout
    image = np.frombuffer(raw, np.uint8).reshape(height, width, 3)
    return torch.from_numpy(image.copy()).to(device).permute(2, 0, 1).unsqueeze(0).float().div(255)


def main() -> None:
    # Windows 콘솔 기본 인코딩(cp1252)으로는 한글 진행 표시를 못 찍는다
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description="사람만 오려 내서 배경 바꾸기")
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--bg", help="배경 그림 경로 또는 #rrggbb (.mp4 출력일 때)")
    parser.add_argument("--model", default="resnet50", choices=["resnet50", "mobilenetv3"])
    parser.add_argument("--ratio", type=float, help="모델 해상도 비율 (0.2~1)")
    args = parser.parse_args()

    width, height, fps, has_audio = probe(args.input)
    ratio = args.ratio or (0.25 if max(width, height) >= 1600 else 0.375 if max(width, height) >= 1000 else 0.5)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = torch.jit.load(str(ROOT / "models" / f"rvm_{args.model}_fp32.torchscript"), map_location=device).eval()
    transparent = args.output.lower().endswith(".webm")
    bg = None if transparent else background(args.bg, width, height, device)
    print(f"{width}x{height} {fps}fps · {args.model} · ratio {ratio} · {device} · {'투명 webm' if transparent else '배경 합성 mp4'}", flush=True)

    decoder = subprocess.Popen(
        ["ffmpeg", "-loglevel", "error", "-i", args.input, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE
    )
    audio = ["-i", args.input, "-map", "0:v", "-map", "1:a"] if has_audio else []
    if transparent:
        encode = ["-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "28", "-row-mt", "1"]
        encode += ["-c:a", "libopus"] if has_audio else []
    else:
        encode = ["-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
        encode += ["-c:a", "aac", "-b:a", "192k"] if has_audio else []
    encoder = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgba" if transparent else "rgb24",
         "-s", f"{width}x{height}", "-r", fps, "-i", "-", *audio, *encode, "-shortest", args.output],
        stdin=subprocess.PIPE,
    )

    size = width * height * 3
    rec = [None] * 4
    count = 0
    started = time.time()
    with torch.no_grad():
        while True:
            chunk = decoder.stdout.read(size)
            if len(chunk) < size:
                break
            frame = torch.frombuffer(bytearray(chunk), dtype=torch.uint8).to(device).view(height, width, 3)
            src = frame.permute(2, 0, 1).unsqueeze(0).float().div(255)
            fgr, pha, *rec = model(src, *rec, ratio)
            if transparent:
                out = torch.cat([fgr, pha], dim=1)
            else:
                out = fgr * pha + bg * (1 - pha)
            encoder.stdin.write(out.clamp(0, 1).mul(255).byte()[0].permute(1, 2, 0).contiguous().cpu().numpy().tobytes())
            count += 1
            if count % 60 == 0:
                print(f"  {count} frames · {count / (time.time() - started):.1f} fps", flush=True)

    encoder.stdin.close()
    encoder.wait()
    decoder.wait()
    print(f"✓ {args.output} ({count} frames, {time.time() - started:.0f}s)")
    sys.exit(encoder.returncode)


if __name__ == "__main__":
    main()
