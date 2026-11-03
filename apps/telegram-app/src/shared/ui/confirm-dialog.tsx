"use client";

import { uzt } from "../i18n/uz-text";
import { CenteredDialog, dialogStyles } from "./centered-dialog";
import { MobileIcon, type IoniconName } from "./mobile-icon";

export type ConfirmTone = "danger" | "primary" | "warning";

export function ConfirmDialog({ cancelKey, confirmKey, icon, messageKey, onCancel, onConfirm, open, titleKey, tone = "danger" }: {
  open: boolean;
  tone?: ConfirmTone;
  icon: IoniconName;
  titleKey: string;
  messageKey?: string;
  confirmKey: string;
  cancelKey?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const iconTone = tone === "danger" ? dialogStyles.iconDanger : tone === "warning" ? dialogStyles.iconWarning : "";
  return (
    <CenteredDialog onClose={onCancel} open={open} role={cancelKey ? "dialog" : "alertdialog"}>
      <span aria-hidden="true" className={`${dialogStyles.icon} ${iconTone}`}><MobileIcon name={icon} size={34} /></span>
      <h2 className={dialogStyles.title} data-i18n={titleKey}>{uzt(titleKey)}</h2>
      {messageKey && <p className={dialogStyles.message} data-i18n={messageKey}>{uzt(messageKey)}</p>}
      <div className={dialogStyles.actions}>
        <button className={tone === "danger" ? dialogStyles.danger : dialogStyles.primary} onClick={() => { window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light"); onConfirm(); }} type="button"><span data-i18n={confirmKey}>{uzt(confirmKey)}</span></button>
        {cancelKey && <button className={dialogStyles.secondary} onClick={onCancel} type="button"><span data-i18n={cancelKey}>{uzt(cancelKey)}</span></button>}
      </div>
    </CenteredDialog>
  );
}
