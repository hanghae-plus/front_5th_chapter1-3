import React, { useState, useCallback } from "react";
import {
  ThemeProvider,
  UserProvider,
  NotificationsProvider,
  useNotificationsContext,
} from "./contexts";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "./components";
import { useThemeContext } from "./contexts/ThemeContext";
import { memo } from "./@lib";
import { Item, Notification } from "./type";
import { generateItems } from "./utils";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <NotificationsProvider>
      <ThemeProvider>
        <AppContent items={items} onAddItems={addItems} />
      </ThemeProvider>
    </NotificationsProvider>
  );
};

// [ 컴포넌트 분리를 통한 리렌더링 격리 ]
// 별도의 메모화된 컴포넌트로 분리
// AppContent가 리렌더링되어도 UserSection은 addNotification이 동일하면 리렌더링 발생하지 않음
// 알림상태가 변경되면 NotificationSystem과 ComplexForm만 리렌더링됨
const UserSection = memo(
  ({
    addNotification,
  }: {
    addNotification: (message: string, type: Notification["type"]) => void;
  }) => {
    return (
      <UserProvider addNotification={addNotification}>
        <Header />
      </UserProvider>
    );
  }
);

const AppContent: React.FC<{
  items: Item[];
  onAddItems: () => void;
}> = memo(({ items, onAddItems }) => {
  const { theme } = useThemeContext();
  const { addNotification } = useNotificationsContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <UserSection addNotification={addNotification} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={onAddItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
});

export default App;
