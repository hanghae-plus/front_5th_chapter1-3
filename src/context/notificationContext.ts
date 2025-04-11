import { createContext } from "react";
import { NotificationContextType } from "../types/types"; // 타입 경로 확인 필요

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
