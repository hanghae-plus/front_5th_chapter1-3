import React from "react";

import {
  UserProvider,
  ThemeProvider,
  NotificationProvider,
} from "./@lib/context";
import { Content } from "./components";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Content />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
