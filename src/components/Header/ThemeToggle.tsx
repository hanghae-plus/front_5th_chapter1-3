import { memo } from "../../hocs";
import { useThemeState, useThemeAction } from "../../context";
import { Button } from "../common";

export const ThemeToggle = memo(() => {
  const theme = useThemeState();
  const toggleTheme = useThemeAction();

  return (
    <Button onClick={toggleTheme} className="mr-2">
      {theme === "light" ? "다크 모드" : "라이트 모드"}
    </Button>
  );
});
