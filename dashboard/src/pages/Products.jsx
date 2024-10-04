import { Link } from "react-router-dom";
import AllProducts from "../components/products/AllProducts";
import SearchBar from "../components/products/SearchBar";

const Products = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Products</h1>
        </header>
      </div>

      <div className="mt-10">
        <SearchBar />
      </div>
      <div className="mt-10">
        <AllProducts />
      </div>
      <button className="bg-slate-400 h-fit w-fit p-5 mt-8 rounded-sm">
        <Link to="/products/add">Add product </Link>
      </button>
    </div>
  );
};

export default Products;
