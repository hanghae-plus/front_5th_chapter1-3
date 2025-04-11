import { ReactNode } from "react";
import { useThemeContext } from "../@lib/hooks/useThemeContext";
import { memo } from "../@lib";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = memo(({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
});
