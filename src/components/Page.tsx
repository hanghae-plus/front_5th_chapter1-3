import Header from "./header/Header";
import ItemList from "../components/ItemList";
import ComplexForm from "../components/ComplexForm";
import NotificationSystem from "../components/NotificationSystem";
import { useThemeContext } from "../contexts/ThemeContext";
import { LoginContextProvider } from "../contexts/provider/LoginProvider";

export default function Page() {
  const { theme } = useThemeContext();
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <LoginContextProvider>
        <Header />
      </LoginContextProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
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
