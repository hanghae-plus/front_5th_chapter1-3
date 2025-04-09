import { useContext } from "react";
import { NotificationStateContext } from "./NotificationStateContext";

export const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
};
