import React, { useState } from "react";
import { generateItems } from "./utils";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { AppShell } from "./AppShell";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
          <AppShell items={items} onAddItemsClick={addItems} />
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
