import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import { ComplexForm } from "../../components/ComplexForm";
import { NotificationSystem } from "../../components/NotificationSystem";
import { useHome } from "./useHome";

export const Home = () => {
  const { theme, items, addItems } = useHome();

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
};
