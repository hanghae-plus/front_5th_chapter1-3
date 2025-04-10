import { useState } from "react";
import useAppContext from "../contexts/useAppContext";
import { ComplexForm } from "./ComplexForm";
import { Header } from "./Header";
import { NotificationSystem } from "./NotificationSystem";
import { generateItems } from "../utils";
import { ItemList } from "./ItemList";
import { useMemo } from "../@lib";

const Main = () => {
  const { theme } = useAppContext();

  // 여러 작업을 연속으로 수행해도 각 컴포넌트는 필요한 경우에만 리렌더링되어야 한다
  const _items = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(_items);

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

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

export default Main;
