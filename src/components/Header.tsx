import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";
import { useContextValue } from "../context/useContextValue";
import { LoginButton } from './LoginButton';
import { renderLog } from "../utils";

export const Header: React.FC = () => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useContextValue(ThemeContext);
  const userContext = useContextValue(UserContext)

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
          <LoginButton user={ userContext.user } />
        </div>
      </div>
    </header>
  );
};
