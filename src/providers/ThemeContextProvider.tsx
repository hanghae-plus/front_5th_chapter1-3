import { useState } from "react";
import type { TTheme } from "#src/types";
import { useCallback, useMemo } from "#src/@lib";
import { ThemeContext, ThemeContextType } from "#src/hooks/useThemeContext";

const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<TTheme>("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeContextValue: ThemeContextType = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
