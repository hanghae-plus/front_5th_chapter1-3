import { createContext, useContext } from "react";
import { AppType } from "../types";

export const AppContext = createContext<AppType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
