import React from "react";
import { useThemeContext } from "../contexts/ThemeContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default Layout;
