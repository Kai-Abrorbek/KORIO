import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { TelegramAuthProvider } from "../src/features/auth/model/telegram-auth-context";
import { LanguageProvider } from "../src/shared/i18n/language-context";
import { MicrophonePermissionBootstrap } from "../src/shared/browser/microphone-permission-bootstrap";
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
            __html: `(function(){try{var p=localStorage.getItem("korio-theme");var t=p==="light"||p==="dark"?p:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var l=localStorage.getItem("korio-language");l=l==="uz"||l==="ru"||l==="en"||l==="ko"?l:"uz";document.documentElement.dataset.theme=t;document.documentElement.dataset.language=l;document.documentElement.lang=l;document.documentElement.style.colorScheme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js?63"
          strategy="beforeInteractive"
        />
        <MicrophonePermissionBootstrap />
        <LanguageProvider>
          <ThemeProvider>
            <TelegramAuthProvider>{children}</TelegramAuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
