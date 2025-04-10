import { useThemeContext } from "../../context/useThemeContext";
import { useUserContext } from "../../context/useUserContext";

export const useHeader = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { user, login, logout } = useUserContext();

  const handleLogin = () => {
    login("user@example.com", "password");
  };

  return {
    theme,
    toggleTheme,
    user,
    login,
    logout,
    handleLogin,
  };
};
