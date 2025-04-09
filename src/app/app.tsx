import { NotificationProvider } from "@/features/notification";
import { MainPage } from "@/pages";

import { Layout } from "./layout/Layout";
import { ThemeProvider } from "./model";

const App: React.FC = () => (
  <ThemeProvider>
    <NotificationProvider>
      <Layout>
        <MainPage />
      </Layout>
    </NotificationProvider>
  </ThemeProvider>
);

export { App };
