import { Header } from "./Header";
import { ComplexForm } from "./ComplexForm";
import { NotificationSystem } from "./NotificationSystem";
import { useTheme } from "../context/ThemeContext";
import { ItemList } from "./ItemList";
export default function Main() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList theme={theme} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
}
