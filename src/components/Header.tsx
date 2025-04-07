import React from "react";
import { renderLog } from "../utils.ts";
import { useThemeContext } from "../store/ThemeContext.tsx";
import { useUserContext } from "../store/UserContext.tsx";

export const Header: React.FC = React.memo(() => {
  renderLog("Header rendered");

  const { theme, toggleTheme } = useThemeContext();
  const { user, login, logout } = useUserContext();

  const loginClick = (email: string, password: string) => {
    login(email, password);
  };

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    loginClick("user@example.com", "password");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
