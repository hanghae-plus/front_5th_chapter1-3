import { useMemo, useState } from "react";
import { ThemeContext } from ".";

/**
 * @title ThemeProvider
 * @description ThemeProvider는 테마를 관리하는 Context Provider입니다.
 * @param param0 - children
 * @returns
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
