export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}
