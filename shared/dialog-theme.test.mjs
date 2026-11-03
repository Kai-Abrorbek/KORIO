import assert from "node:assert/strict";
import { register } from "node:module";
import { test } from "node:test";

register(
  `data:text/javascript,${encodeURIComponent(`
  export async function resolve(specifier, context, nextResolve) {
    try { return await nextResolve(specifier, context); }
    catch (error) {
      if (error.code === "ERR_MODULE_NOT_FOUND" && specifier.startsWith("."))
        return nextResolve(specifier + ".ts", context);
      throw error;
    }
  }
`)}`,
  import.meta.url,
);

const { getDialogPalette, getDialogTone, getDialogCssVariables } =
  await import("./dialog-theme.ts");

function luminance(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

test("all dialog tones keep readable labels in both themes", () => {
  for (const dark of [false, true]) {
    const p = getDialogPalette(dark);
    for (const tone of ["primary", "success", "warning", "danger"]) {
      const look = getDialogTone(p, tone);
      assert.ok(contrast(look.ink, look.fill) >= 4.5, `${dark}/${tone} icon`);
      assert.ok(
        contrast(look.onAction, look.action) >= 4.5,
        `${dark}/${tone} action`,
      );
      assert.ok(
        contrast(look.onAction, look.pressed) >= 4.5,
        `${dark}/${tone} pressed`,
      );
    }
    assert.ok(contrast(p.text, p.surface) >= 4.5);
    assert.ok(contrast(p.textSecondary, p.surface) >= 4.5);
    assert.ok(contrast(p.textSecondary, p.soft) >= 4.5);
  }
});

test("web dialog colors match native roles and avoid global theme variable names", () => {
  for (const dark of [false, true]) {
    const p = getDialogPalette(dark);
    const css = getDialogCssVariables(dark);
    assert.equal(css["--dialog-bg"], p.surface);
    assert.equal(css["--dialog-action"], p.action);
    assert.equal(css["--dialog-danger"], p.dangerAction);
    assert.equal(css["--dialog-backdrop"], p.backdrop);
    assert.ok(Object.keys(css).every((key) => key.startsWith("--dialog-")));
  }
});
