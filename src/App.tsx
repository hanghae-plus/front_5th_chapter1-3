import React from "react";
import { Main } from "./components";
import { AuthProvider } from "./context/AuthContext/AuthProvider";
import { NotificationProvider } from "./context/NotificationContext/NotificationProvider";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
