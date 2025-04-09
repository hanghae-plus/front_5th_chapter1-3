import { useContext } from "react";
import { NotificationActionContext } from "./NotificationActionContext";

export const useNotificationActions = () => {
  const context = useContext(NotificationActionContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationActions must be used within a NotificationProvider"
    );
  }
  return context;
};
