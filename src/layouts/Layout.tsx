import { memo } from "../@lib";
import { useThemeContext } from "../contexts";
import { Header } from "../components/Header";
import { NotificationSystem } from "../components/NotificationSystem";

export const Layout: React.FC<React.PropsWithChildren> = memo(
  ({ children }) => {
    const { theme } = useThemeContext();

    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <Header />
        {children}
        <NotificationSystem />
      </div>
    );
  },
);
