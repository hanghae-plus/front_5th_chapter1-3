import { NotificationProvider } from "./notification/NotificationProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { UserProvider } from "./user/UserProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
