import { ThemeProvider, useTheme } from "@app/model";
import { AuthProvider } from "@features/auth/model/AuthProvider";

import { Header } from "@/components";
import { NotificationProvider } from "@/features/notification";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <NotificationProvider>
        <main
          className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
        >
          <AuthProvider>
            <Header />
          </AuthProvider>
          {children}
        </main>
      </NotificationProvider>
    </ThemeProvider>
  );
}
