import { createContext, useCallback, useMemo, useState } from "react";

interface ContextValue {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ThemePropvider = ({ children }: Props) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const contextValue: ContextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
