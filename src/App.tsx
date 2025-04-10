import React from "react";
import Page from "./components/Page";
import { ThemeProvider } from "./contexts/provider/ThemeProvider";
import { NotificationProvider } from "./contexts/provider/NotificationProvider";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Page />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
