import { NotificationProvider } from "./provider/NotificationProvider";
import { UserProvider } from "./provider/UserProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import { Home } from "./components/Home";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;
