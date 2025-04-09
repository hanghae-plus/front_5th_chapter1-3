import { useThemeState, useUserState } from "../../context";
import { memo } from "../../hocs";
import { renderLog } from "../../utils";
import { ThemeToggle } from "./ThemeToggle";
import { UserSection } from "./UserSection";

export const Header: React.FC = memo(() => {
  renderLog("Header rendered");

  useThemeState();
  useUserState();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <ThemeToggle />
          <UserSection />
        </div>
      </div>
    </header>
  );
});
