import { useTheme } from "@app/model";
import { AuthProvider } from "@features/auth/model/AuthProvider";

import { Header } from "@/components";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <main
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <AuthProvider>
        <Header />
      </AuthProvider>
      {children}
    </main>
  );
}
