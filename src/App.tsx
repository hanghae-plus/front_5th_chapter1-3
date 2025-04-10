import { NotificationProvider, ThemeProvider, UserProvider } from "./contexts";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Home />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
