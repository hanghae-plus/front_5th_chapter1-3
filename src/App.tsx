import React from "react";
import { NotificationProvider, ThemeProvider, UserProvider } from "./context";
import { Root } from "./container";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Root />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
