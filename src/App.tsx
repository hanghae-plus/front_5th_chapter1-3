import { Providers } from "./context/providers.tsx";
import { Header } from "./components/Header.tsx";
import { NotificationSystem } from "./components/NotificationSystem.tsx";
import { ItemList } from "./components/ItemList.tsx";
import { ComplexForm } from "./components/ComplexForm.tsx";
import { ThemedBackground } from "./components/ThemedBackground.tsx";

// 메인 App 컴포넌트
const App = () => {
  return (
    <Providers>
      <ThemedBackground>
        <Header />
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
        <NotificationSystem />
      </ThemedBackground>
    </Providers>
  );
};

export default App;
