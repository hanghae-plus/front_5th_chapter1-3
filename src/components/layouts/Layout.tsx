import { useThemeContext } from "#src/hooks/useThemeContext";
import Header from "#src/components/layouts/Header";
import NotificationSystem from "#src/components/common/NotificationSystem";
import { memo } from "#src/@lib";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
};

export default memo(Layout);
