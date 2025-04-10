import { Item } from "./item.types";
import { Notification } from "./notification.types";
import { User } from "./user.types";

export interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export interface ItemsContextType {
  items: Item[];
  addItems: () => void;
}

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface AppType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
