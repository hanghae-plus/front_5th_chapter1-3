import { Fragment } from "react/jsx-runtime";
import { ComplexForm } from "../../widgets/form";
import { Header } from "../../widgets/header";
import { NotificationSystem } from "../../widgets/notification";
import { ProductList } from "../../widgets/products";

export const MainPage = () => {
  return (
    <Fragment>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ProductList />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </Fragment>
  );
};
