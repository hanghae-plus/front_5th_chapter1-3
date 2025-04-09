import { createContext } from "react";
import { Notification } from "../../types";

export const NotificationStateContext = createContext<Notification[]>([]);
