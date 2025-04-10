import AppContainer from "./AppContainer";

import React, { useState } from "react";
import { generateItems } from "./utils/utils";
import { memo, useCallback } from "./@lib";
import { ThemeProvider } from "./store/theme/ThemeProvider";
import { UserProvider } from "./store/user/UserProvider";
import { NotificationProvider } from "./store/notification/NotificationProvider";

// TODO: 아예 theme관련 로직도 모두 다 theme.ts에다가 다 넣어버리고 나머지도
const initialItems = () => generateItems(1000);

// 메인 App 컴포넌트
const App: React.FC = memo(() => {
  const [items, setItems] = useState(initialItems);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <AppContainer items={items} addItems={addItems} />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
});

export default App;
