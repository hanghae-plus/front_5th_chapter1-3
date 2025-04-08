import { NotificationProvider } from "../features/notification";
import { MainPage } from "../pages";
import { Layout } from "./layout/Layout";
import { ThemeProvider } from "./model/ThemeProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Layout>
          <MainPage />
        </Layout>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export { App };
