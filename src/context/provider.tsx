import { ThemeProvider } from "./theme/provider";
import { NotificationProvider } from "./notification/provider";
import { UserProvider } from "./user/provider";
import { ItemProvider } from "./item/provider";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <ItemProvider>{children}</ItemProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
