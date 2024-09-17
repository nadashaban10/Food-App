import AddCategory from "../components/categories/Addcategory";
import AllCategories from "../components/categories/Allcategories";

const Categories = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Categories</h1>
        </header>
      </div>
      <div className="mt-10">
        <AddCategory />
      </div>
      <div className="mt-10">
        <AllCategories />
      </div>
    </div>
  );
};

export default Categories;
