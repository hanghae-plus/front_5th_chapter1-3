import { createContext } from "react";

//
export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

//
export interface NotiContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

//
export const NotiContext = createContext<NotiContextType | undefined>(
  undefined
);
