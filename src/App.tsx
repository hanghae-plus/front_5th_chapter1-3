import React from "react";
import { AuthProvider, NotificationProvider, ThemeProvider } from "./contexts";
import { AppContent } from "./AppContent";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
