import React, { Context, useContext } from "react";
import { AppContextType } from "../../type/type";

export const useAppContext = (ctx: Context<AppContextType | undefined>) => {
  const context = useContext(ctx);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
