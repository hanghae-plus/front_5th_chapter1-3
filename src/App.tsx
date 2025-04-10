import React from "react";
import { AppProviders } from "./providers";
import { ComplexForm, ItemList } from "./features";
import { Layout } from "./shared/components/layout/Layout";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppProviders>
      <Layout>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </Layout>
    </AppProviders>
  );
};

export default App;
