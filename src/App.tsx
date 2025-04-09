import React from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "./providers/UserProvider";
import { NotificationProvider } from "./providers/NotificationProvider";
import { RootComponent } from "./RootComponent";

// 타입 정의

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
