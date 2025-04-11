import { ThemeProvider } from "./context/ThemeContext";
import Main from "./components/Main";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;
