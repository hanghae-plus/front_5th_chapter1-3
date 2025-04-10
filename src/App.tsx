import { ThemeProvider, useThemeContext } from "./contexts/themeContext.tsx";
import { NotificationProvider } from "./contexts/notificationContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { ItemListProvider } from "./contexts/itemListContext.tsx";
import Header from "./components/Header.tsx";
import ComplexForm from "./components/ComplexForm.tsx";
import ItemList from "./components/ItemList.tsx";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemListProvider>
              <ItemList />
            </ItemListProvider>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <NotificationProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </NotificationProvider>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
