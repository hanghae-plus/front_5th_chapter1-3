import { MainPage } from "@pages/ui";
import { NotificationProvider } from "@features/notification/model";

import { AppLayout } from "./layout";
import { ThemeProvider } from "./model";

const App: React.FC = () => (
  <ThemeProvider>
    <NotificationProvider>
      <AppLayout>
        <MainPage />
      </AppLayout>
    </NotificationProvider>
  </ThemeProvider>
);

export { App };
