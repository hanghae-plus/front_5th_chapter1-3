import React from "react";
import { ThemeProvider, NotificationProvider, AuthProvider } from "./context";
import { MainPage } from "./pages/MainPage";
import { ItemProvider } from "./context/ItemContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ItemProvider>{children}</ItemProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
};

export default App;
