import { createContext, Dispatch, SetStateAction } from "react";

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface NotificationContextType {
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
