import { AppContent } from "./AppContent";
import {
  AuthProvider,
  NotificationProvider,
  ThemeProvider,
  ItemProvider,
} from "./contexts";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ItemProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ItemProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default App;
