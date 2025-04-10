import { useContext } from "react";
import { NotificationContext } from "../contexts";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
