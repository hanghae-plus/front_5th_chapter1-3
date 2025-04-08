import { Header } from "../../components";
import { AuthProvider } from "../../features/auth/model/AuthProvider";
import { useTheme } from "../model";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <AuthProvider>
        <Header />
      </AuthProvider>
      {children}
    </div>
  );
}
