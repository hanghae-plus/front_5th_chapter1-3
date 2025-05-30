import { memo } from "../@lib";
import { useThemeContext } from "../context/theme";

type ThemedBackgroundProps = {
  children: React.ReactNode;
};

export const ThemedBackground = memo(({ children }: ThemedBackgroundProps) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
      }`}
    >
      {children}
    </div>
  );
});
