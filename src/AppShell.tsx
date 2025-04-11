import { memo } from "./@lib";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";
import { useTheme } from "./hooks/useTheme";
import { ItemListProps } from "./types";

export const AppShell: React.FC<ItemListProps> = memo(
  ({ items, onAddItemsClick }) => {
    const { theme } = useTheme();

    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={onAddItemsClick} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    );
  },
);
