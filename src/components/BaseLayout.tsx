import { PropsWithChildren } from "react";

import { memo } from "../@lib";
import { useThemeContext } from "../context/ThemeContext";

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default memo(BaseLayout);
