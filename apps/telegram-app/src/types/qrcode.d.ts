declare module "qrcode" {
  interface QRCodeModules {
    data: Uint8Array;
    size: number;
  }

  interface QRCodeResult {
    modules: QRCodeModules;
  }

  export function create(
    text: string,
    options?: { errorCorrectionLevel?: "L" | "M" | "Q" | "H" },
  ): QRCodeResult;
}
