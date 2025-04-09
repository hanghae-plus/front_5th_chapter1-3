import { MainLayout, ItemList, ComplexForm } from "../components";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4">
          <ItemList />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <ComplexForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
