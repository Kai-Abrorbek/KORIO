"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { getDialogCssVariables } from "../../../../../shared/dialog-theme";
import { translateText } from "../i18n/language-context";
import { uzt } from "../i18n/uz-text";
import { useTelegramBackOverride } from "../telegram/back-button";
import { useAppTheme } from "../theme/theme-context";
import styles from "./centered-dialog.module.css";

const panels: HTMLElement[] = [];
let beforeOverflow = "";
const FOCUSABLE =
  'button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]';

export function useDialogStyle(): CSSProperties {
  const { resolvedTheme } = useAppTheme();
  return getDialogCssVariables(resolvedTheme === "dark") as CSSProperties;
}

/** Centered confirmations share one focus, safe-area and scrolling boundary. */
export function CenteredDialog({
  open = true,
  shown,
  onClose,
  dismissible = true,
  backdropDismissible = dismissible,
  label,
  role = "dialog",
  children,
  className = "",
  rootClassName = "",
  style,
}: {
  open?: boolean;
  shown?: boolean;
  onClose?: () => void;
  dismissible?: boolean;
  backdropDismissible?: boolean;
  label?: string;
  role?: "dialog" | "alertdialog";
  children: ReactNode;
  className?: string;
  rootClassName?: string;
  style?: CSSProperties;
}) {
  const panel = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const latestClose = useRef(onClose);
  latestClose.current = onClose;
  const titleId = useId();
  const colors = useDialogStyle();
  useTelegramBackOverride(
    open
      ? () => {
          if (dismissible) latestClose.current?.();
        }
      : null,
  );
  useEffect(() => {
    if (!mounted || !open || shown === false || !panel.current) return;
    const element = panel.current;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const heading = element.querySelector("h1,h2,h3");
    if (heading && !label) {
      if (!heading.id) heading.id = titleId;
      element.setAttribute("aria-labelledby", heading.id);
      element.removeAttribute("aria-label");
    }
    if (!panels.length) {
      beforeOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    panels.push(element);
    element.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (panels.at(-1) !== element) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (dismissible) latestClose.current?.();
      }
      if (event.key !== "Tab") return;
      const controls = [
        ...element.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((control) => control.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) {
        event.preventDefault();
        element.focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === element)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !element.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      const wasTop = panels.at(-1) === element;
      const index = panels.indexOf(element);
      if (index >= 0) panels.splice(index, 1);
      document.removeEventListener("keydown", onKey, true);
      if (!panels.length) document.body.style.overflow = beforeOverflow;
      if (wasTop && previous?.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [dismissible, label, mounted, open, shown, titleId]);
  if (!open || !mounted) return null;
  return createPortal(
    <div
      aria-hidden={shown === false || undefined}
      inert={shown === false || undefined}
      className={`${styles.root} ${rootClassName}`}
      style={{
        ...colors,
        ...(shown === undefined
          ? {}
          : {
              opacity: shown ? 1 : 0,
              animation: "none",
              pointerEvents: shown ? "auto" : "none",
            }),
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className={styles.backdrop}
        onMouseDown={() => {
          if (backdropDismissible) latestClose.current?.();
        }}
      />
      <section
        aria-label={label ?? translateText(uzt("common.confirm"))}
        aria-modal="true"
        className={`${styles.surface} ${className}`}
        ref={panel}
        role={role}
        tabIndex={-1}
      >
        {children}
      </section>
    </div>,
    document.body,
  );
}

export { styles as dialogStyles };
