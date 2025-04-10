export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}
