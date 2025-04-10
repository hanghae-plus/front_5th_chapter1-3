import React from "react";
import { AppContextProvider } from "./contexts/AppContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import Main from "./components/Main";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
          <Main />
        </AuthContextProvider>
      </NotificationContextProvider>
    </AppContextProvider>
  );
};

export default App;
