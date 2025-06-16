import React from "react";
import { Home } from "./components/Home";
import { ThemeProvider, UserProvider, NotificationProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <UserProvider>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
