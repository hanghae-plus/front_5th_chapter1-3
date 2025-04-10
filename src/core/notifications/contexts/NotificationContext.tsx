import { createContext } from "react";
import { NotificationContextProps } from "../types";

export const NotificationContext =
  createContext<NotificationContextProps | null>(null);
