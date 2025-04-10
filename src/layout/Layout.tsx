import React from "react";
import { useThemeContext } from "../contexts/theme/useThemeContext";
import NotificationSystem from "../ui/NotificationSystem";
import Header from "./Header";
import { memo } from "../@lib";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container px-4 py-8 mx-auto">{children}</div>

      <NotificationSystem />
    </div>
  );
};

export default memo(Layout);
