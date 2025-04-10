import { memo, ReactNode } from "react";
import { Header, NotificationSystem, useTheme } from "../../../core";

export const Layout: React.FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const { theme } = useTheme();

    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">{children}</div>
        <NotificationSystem />
      </div>
    );
  },
);
