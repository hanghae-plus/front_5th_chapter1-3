import React from "react";
import { ComplexForm, NotificationSystem } from "../../components";
import { ProductProvider } from "../../features/product/model/ProductProvider";
import { ProductList } from "../../components/ProductList";

const MainPage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ProductProvider>
              <ProductList />
            </ProductProvider>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </>
  );
};

export { MainPage };
