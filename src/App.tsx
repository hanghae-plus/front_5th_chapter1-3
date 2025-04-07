import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { useItems, useTheme, useAuth, useNotifications } from "./hooks";

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { items, addItems } = useItems();
  const { notifications, addNotification, removeNotification } =
    useNotifications();
  const { user, login, logout } = useAuth(addNotification);

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        login={login}
        logout={logout}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} theme={theme} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm
              user={user}
              notifications={notifications}
              addNotification={addNotification}
            />
          </div>
        </div>
      </div>
      <NotificationSystem
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default App;
