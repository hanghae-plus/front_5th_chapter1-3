import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { Main } from "./components/Main";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;
