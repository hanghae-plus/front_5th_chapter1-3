export type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Notification = {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
};
