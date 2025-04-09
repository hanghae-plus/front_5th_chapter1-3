import React, { createContext, useContext, useState } from "react";
import { useMemo } from "../@lib/hooks/useMemo";
import { useCallback } from "../@lib/hooks/useCallback";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  /**  setTheme을 할 때, 이전 값을 사용하여 새로운 값을 계산하는 함수형 업데이트를 사용 -> 최신값을 가져올 수 있음
   *  useCallback, 빈배열을 의존성으로 설정하여, ThemeProvider가 처음 렌더링될 때만 생성
   *  theme가 바뀌지 않으면 같은 참조 유지 */
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  /** useMemo로 값을 메모이제이션하여 theme가 바뀌지 않으면 같은 참조 유지
   *  toggleTheme는 useCallback으로 메모이제이션 되어 있으므로,
   *  theme가 바뀌지 않으면 같은 참조 유지되므로 의존성 배열에 theme만 넣음
   */
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme is used outside of ThemeProvider");
  }
  return context;
};
