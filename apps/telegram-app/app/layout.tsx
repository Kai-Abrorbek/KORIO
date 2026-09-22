import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { TelegramAuthProvider } from "../src/features/auth/model/telegram-auth-context";
import { ThemeProvider } from "../src/shared/theme/theme-context";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "KORIO",
  description: "Koreys tilini KORIO bilan o'rganing",
  title: "KORIO",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("korio-theme");var t=p==="light"||p==="dark"?p:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js?63"
          strategy="beforeInteractive"
        />
        <ThemeProvider>
          <TelegramAuthProvider>{children}</TelegramAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
