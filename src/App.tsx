import { NotificationProvider } from "./contexts/notification/NotificationProvider";
import { UserProvider } from "./contexts/user/UserProvider";
import { ThemeProvider } from "./contexts/theme/ThemeProvider";
import { Home } from "./components/Home";

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
