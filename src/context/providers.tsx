import { ItemProvider } from "./item/provider";
import { NotificationProvider } from "./notification/provider";
import { ThemeProvider } from "./theme/provider";
import { UserProvider } from "./user/provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
