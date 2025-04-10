import React from "react";

import { Header } from "../layout";
import {
  ItemList,
  ComplexForm,
  NotificationSystem,
  ThemeWrapper,
} from "../components";
import { useAppContext, useItemsContext } from "../contexts";

const MainPage: React.FC = () => {
  const { user } = useAppContext();
  const { items, addItems } = useItemsContext();
  return (
    <ThemeWrapper>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm user={user} />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </ThemeWrapper>
  );
};

export default MainPage;
