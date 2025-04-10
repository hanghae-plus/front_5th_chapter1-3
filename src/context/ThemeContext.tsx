// ThemeContext.tsx
import React, { createContext } from "react";
import { useMemo } from "../@lib/hooks/useMemo";
import { useTheme } from "../hooks/theme/useTheme";
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, toggleTheme } = useTheme();
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
