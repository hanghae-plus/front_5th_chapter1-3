import NotificationSystem from "./features/notification/NotificationSystem";
import NotificationProvider from "./features/notification/NotificationProvider";
import { AuthProvider } from "./features/auth/AuthProvider";
import ThemeProvider from "./features/theme/ThemeProvider";
import Header from "./components/Header";
import ItemList from "./features/items/ItemList";
import ComplexForm from "./features/form/ComplexForm";

const App = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemList />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
                <NotificationSystem />
              </div>
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
