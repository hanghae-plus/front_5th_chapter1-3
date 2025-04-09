import React from "react";
import { UserProvider, NotificationProvider, ThemeProvider } from "./context";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <HomePage />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
