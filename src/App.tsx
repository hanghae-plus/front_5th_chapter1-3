import React from "react";
import ThemeProvider from "./providers/ThemeProvider";
import NotificationProvider from "./providers/NotificationProvider";
import UserProvider from "./providers/UserProvider";
import { RootComponent } from "./RootComponent";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <RootComponent />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
