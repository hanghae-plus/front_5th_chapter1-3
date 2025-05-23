import { NotificationProvider } from "./notification-provider";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </UserProvider>
    </NotificationProvider>
  );
};
