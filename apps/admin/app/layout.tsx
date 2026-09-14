import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/ui/theme";
import { SessionProvider } from "@/features/auth/session";
import { AdminGate } from "@/widgets/admin-gate";

export const metadata: Metadata = {
  title: "KORIO Admin",
  description: "KORIO 운영 콘솔",
};

/**
 * 화면이 뜨기 전에 테마를 정한다.
 *
 * 리액트가 붙기를 기다리면 다크로 쓰는 사람이 흰 화면을 한 번 맞는다.
 * 그래서 저장된 값을 동기 스크립트로 먼저 읽어 html 에 찍는다.
 */
const THEME_BOOT = `
try {
  var t = localStorage.getItem('korio_admin_theme');
  document.documentElement.dataset.theme = t === 'light' ? 'light' : 'dark';
} catch (e) {
  document.documentElement.dataset.theme = 'dark';
}
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <ThemeProvider>
          <SessionProvider>
            <AdminGate>{children}</AdminGate>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
