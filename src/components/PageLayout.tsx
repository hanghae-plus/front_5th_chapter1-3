import React, { ReactNode } from "react";
import NotificationSystem from "./NotificationSystem.tsx";
import Header from "./Header.tsx";
import { useTheme } from "../context/ThemeContext.tsx";

interface PageLayoutProps {
  children: ReactNode;
}
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
      }`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">{children}</div>
      <NotificationSystem />
    </div>
  );
};

export default PageLayout;
