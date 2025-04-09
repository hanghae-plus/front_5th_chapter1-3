import { useState, useCallback, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  /**
   * Q&A 세션에 나온 말씀. context는 무조건 메모이제이션이 필요하답니다!
   * toggleTheme에 useCallback 있는데 왜 한번 더 useMemo를 쓰는 이유
   * <ThemeContext.Provider value={contextValue}>
   * 에서 contextValue {}도 매 렌더링마다 매번 새 객체가 만들어짐으로
   * useMemo로 해두는게 좋다!
   */
  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
