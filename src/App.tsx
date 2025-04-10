import { ItemList, ComplexForm } from "./components";
import { Layout } from "./layouts";
import {
  ThemeProvider,
  UserProvider,
  NotificationProvider,
  UserItemProvider,
} from "./contexts";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <UserItemProvider>
            <Layout>
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 md:pr-4">
                    <ItemList />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-4">
                    <ComplexForm />
                  </div>
                </div>
              </div>
            </Layout>
          </UserItemProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
