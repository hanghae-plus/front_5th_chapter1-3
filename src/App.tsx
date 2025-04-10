import React from "react";
import { AppProvider } from "./providers";
import MainPage from "./page/main-page";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
};

export default App;
