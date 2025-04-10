import { createContext, useState } from "react";
import { AppContextType } from "../types";
import { useCallback, useMemo } from "../@lib";

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  const appValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
