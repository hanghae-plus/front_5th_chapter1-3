import React from "react";
import {
  ThemeProvider,
  AuthProvider,
  NotificationProvider,
  ItemProvider,
} from "./providers";
import MainPage from "./MainPage";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ItemProvider>
            <MainPage />
          </ItemProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
