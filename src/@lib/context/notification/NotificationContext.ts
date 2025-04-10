import { createContext } from "react";
import { NotificationContextType } from "../../../types/context";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
