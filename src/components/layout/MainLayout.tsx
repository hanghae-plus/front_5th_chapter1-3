import { ReactNode } from "react";
import { useThemeState } from "../../context";
import { Header } from "../Header";
import { NotificationSystem } from "../NotificationSystem";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useThemeState();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">{children}</div>
      <NotificationSystem />
    </div>
  );
};
