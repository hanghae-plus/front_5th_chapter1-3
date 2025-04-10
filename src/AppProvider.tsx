"use client";
import type { ReactNode } from "react";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
