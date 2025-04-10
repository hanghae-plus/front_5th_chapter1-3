import React from "react";
import { useThemeContext } from "../contexts/theme/useThemeContext";
import { useUserContext } from "../contexts/user/useUserContext";
import { renderLog } from "../utils";
import { memo, useCallback } from "../@lib";

// Header 컴포넌트
const Header: React.FC = () => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useThemeContext();
  const { user, login, logout } = useUserContext();

  const handleLogin = useCallback(() => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
  }, [login]);

  return (
    <header className="p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={logout}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
