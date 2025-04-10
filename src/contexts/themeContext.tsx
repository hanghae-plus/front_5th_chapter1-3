import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: VoidFunction;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useThemeContext };
