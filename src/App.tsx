import React from "react";
import { AppContextProvider } from "./@lib/context/AppContext";
import { AuthContextProvider } from "./@lib/context/AuthContext";
import { Main } from "./component/cmn/Main";
import { NotificationContextProvider } from "./@lib/context/NotificationContext";

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
