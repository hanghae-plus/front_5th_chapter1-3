import React, { ReactNode } from "react";
import { NotificationProvider, ThemeProvider, UserProvider } from "../core";

export const AppProviders: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
