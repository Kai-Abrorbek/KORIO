import type { ReactNode } from "react";

import { AuthBoundary } from "@/features/auth/ui/auth-boundary";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthBoundary>{children}</AuthBoundary>;
}
