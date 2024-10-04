import Addproducts from "../components/products/Addproducts";

const AddProductsSubMenu = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Products</h1>
        </header>
      </div>
      <div className="mt-10">
        <Addproducts />
      </div>
    </div>
  );
};

export default AddProductsSubMenu;
