import { createContext, useContext } from "react";
import { NotificationContextType } from "../../types/type";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  return context;
};
