import React, { useState } from "react";
import { generateItems } from "./utils";
import { AppProvider } from "./context/AppContext/provider";
import { ThemeProvider } from "./context/ThemeContext/provider";
import { NotificationProvider } from "./context/NotificationContext/provider";
import { AppContent } from "./components";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  return (
    <NotificationProvider>
      <AppProvider>
        <ThemeProvider>
          <AppContent items={items} setItems={setItems} />
        </ThemeProvider>
      </AppProvider>
    </NotificationProvider>
  );
};

export default App;
