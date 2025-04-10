import { createContext, useContext } from "react";
import { AppContextType } from "../../types";

type NoficationContextType = Pick<
  AppContextType,
  "notifications" | "addNotification" | "removeNotification"
>;

export const NotificationContext = createContext<
  NoficationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within an NotificationContext",
    );
  }
  return context;
};
