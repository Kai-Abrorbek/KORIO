"use client";

import { useSyncExternalStore } from "react";
import { uzt } from "../i18n/uz-text";
import {
  currentAppDialog,
  finishAppDialog,
  subscribeAppDialogs,
} from "../telegram/app-dialog-state";
import { CenteredDialog, dialogStyles } from "./centered-dialog";
import { MobileIcon } from "./mobile-icon";

const empty = () => null;

/** Imperative shop/game alerts use the same in-app dialog as every confirmation. */
export function AppDialogHost() {
  const request = useSyncExternalStore(
    subscribeAppDialogs,
    currentAppDialog,
    empty,
  );
  if (!request) return null;
  const confirm = request.kind === "confirm";
  return (
    <CenteredDialog
      key={request.id}
      onClose={() => finishAppDialog(request.id, false)}
      role={confirm ? "dialog" : "alertdialog"}
    >
      <span aria-hidden="true" className={dialogStyles.icon}>
        <MobileIcon
          name={confirm ? "help-circle-outline" : "information-circle-outline"}
          size={36}
        />
      </span>
      <h2 className={dialogStyles.title} data-no-translate>
        {request.message}
      </h2>
      <div className={dialogStyles.actions}>
        <button
          className={dialogStyles.primary}
          data-i18n="common.confirm"
          onClick={() => finishAppDialog(request.id, true)}
          type="button"
        >
          {uzt("common.confirm")}
        </button>
        {confirm && (
          <button
            className={dialogStyles.secondary}
            data-i18n="common.cancel"
            onClick={() => finishAppDialog(request.id, false)}
            type="button"
          >
            {uzt("common.cancel")}
          </button>
        )}
      </div>
    </CenteredDialog>
  );
}
