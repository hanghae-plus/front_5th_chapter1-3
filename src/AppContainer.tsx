import Header from "./Components/Header";
import ItemList from "./Components/ItemList";
import ComplexForm from "./Components/ComplexForm";
import NotificationSystem from "./Components/NotificationSystem";
import { useThemeContext } from "./store/theme/ThemeContext";
import { memo } from "./@lib";

interface itemType {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface PropTypes {
  items: itemType[];
  addItems: () => void;
}

const AppContainer = memo(({ items, addItems }: PropTypes) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
});

export default AppContainer;
