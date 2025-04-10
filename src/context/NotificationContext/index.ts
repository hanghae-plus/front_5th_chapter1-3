// src/contexts/NotificationContext/index.tsx
import { createContext, useContext } from "react";
import type { NotificationContextType } from "./types";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};

export default NotificationContext;
