import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

// 커스텀 훅: useNotificationContext
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "NotificationContext must be used within a NotificationContextProvider",
    );
  }
  return context;
};
