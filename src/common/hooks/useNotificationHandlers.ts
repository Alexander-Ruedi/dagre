import { AxiosError } from "axios";
import { useCallback } from "react";
import { store } from "../store/Store";
import { NotificationActions } from "../store/slices/NotificationSlice";
import { ErrorLevels } from "../store/slices/NotificationSliceModel";
import { useNotification } from "./useNotification";

export enum EventType {
  "save" = "save",
  "create" = "create",
  "update" = "update",
  "delete" = "delete",
  "load" = "load",
}

export const useNotificationHandler = () => {
  const { displayNotification } = useNotification();

  const notifySuccess = useCallback(
    (subject: string, event: EventType) => {
      console.log(`${subject} ${event}d`);
      displayNotification({ title: "Success", message: `${subject} ${event}d` });
    },
    [displayNotification],
  );

  const notifyCustomSuccess = useCallback(
    (subject: string, message: string | string[]) => {
      displayNotification({ title: subject, message: message });
    },
    [displayNotification],
  );

  const notifyWarning = useCallback(
    (title: string, message: string | string[]) => {
      console.warn(title + " " + message);
      displayNotification({ title: title, message: message, level: ErrorLevels.warning, timeout: 10000 });
    },
    [displayNotification],
  );

  const notifyError = useCallback(
    (title: string, message: string | string[]) => {
      console.error(title + " " + message);
      displayNotification({ title: title, message: message, level: ErrorLevels.error });
    },
    [displayNotification],
  );

  const notifyRequestError = useCallback(onRequestError, [displayNotification]);

  return { notifySuccess, notifyRequestError, notifyWarning, notifyCustomSuccess, notifyError } as const;
};

export const onRequestError = (subject: string, e: AxiosError) => {
  console.error("Error occurred", e);
  store.dispatch(
    NotificationActions.addNotification({
      title: "Error",
      message: `Failed to ${subject}: ${getErrorMessage(e)}`,
      level: ErrorLevels.error,
      timeout: null,
    }),
  );
};

const getErrorMessage = (e: AxiosError) => {
  try {
    const { message } = e.response?.data as { message: string };
    return message ?? e.message;
  } catch {
    return e.message;
  }
};
