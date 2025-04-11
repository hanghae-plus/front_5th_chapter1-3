import { createContext, useContext } from "react";
import { NotificationContextType } from "./type";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("NotificationContext has  error");
  }

  return context;
};
