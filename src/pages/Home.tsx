import { useState } from "react";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "../components";
import { useTheme } from "../contexts";
import { generateItems } from "../utils";

function Home() {
  const { theme } = useTheme();
  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = () => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  };
  return (
    <>
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
      </div>
      <NotificationSystem />
    </>
  );
}

export default Home;
