import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within an AppProvider",
    );
  }
  return context;
};

export default useNotificationContext;
