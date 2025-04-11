import { createContext } from "react";
import { UserContextType } from "../types/types"; // 타입 경로 확인 필요

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
