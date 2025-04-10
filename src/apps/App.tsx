import React from "react";
import { ComplexForm } from "../widgets/form";
import { Header } from "../widgets/header";
import { NotificationSystem } from "../widgets/notification";
import { ProductList } from "../widgets/products";
import { CommonLayout } from "./layout/CommonLayout";
import { AuthenticationProvider } from "./providers/authentication";
import { NotificationProvider } from "./providers/notification";
import { ThemeProvider } from "./providers/theme";

// // AppContext 타입 정의
// interface AppContextType {
//   theme: string;
//   toggleTheme: () => void;

//   user: User | null;
//   login: (email: string, password: string) => void;
//   logout: () => void;

//   // notifications: Notification[];
//   // addNotification: (message: string, type: Notification["type"]) => void;
//   // removeNotification: (id: number) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// // 커스텀 훅: useAppContext
// const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

// 메인 App 컴포넌트
const App: React.FC = () => {
  // const [items, setItems] = useState(generateItems(1000));

  // const addItems = () => {
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     ...generateItems(1000, prevItems.length),
  //   ]);
  // };

  // const [theme, setTheme] = useState("light");
  // const [items, setItems] = useState(generateItems(1000));
  // const [user, setUser] = useState<User | null>(null);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  // const addItems = () => {
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     ...generateItems(1000, prevItems.length),
  //   ]);
  // };

  // const login = (email: string) => {
  //   setUser({ id: 1, name: "홍길동", email });
  //   addNotification("성공적으로 로그인되었습니다", "success");
  // };

  // const logout = () => {
  //   setUser(null);
  //   addNotification("로그아웃되었습니다", "info");
  // };

  // const contextValue: AppContextType = {
  //   // theme,
  //   // toggleTheme,
  //   user,
  //   login,
  //   logout,
  // };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthenticationProvider>
          <CommonLayout>
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ProductList
                  // items={items} onAddItemsClick={addItems}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
          </CommonLayout>
        </AuthenticationProvider>
        <NotificationSystem />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
