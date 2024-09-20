import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { useEffect } from "react";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log("categories: ", categories);

  return (
    <div className="bg-white text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl"> All Categories</strong>
      <div>
        <table className="mt-5 table-fixed w-full">
          <thead>
            <tr className=" bg-slate-100 text-slate-800 font-semibold ">
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Id
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                <span></span>Category Name
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                <span></span>Description
              </td>
              <td className="py-4 px-2 w-[200px] hover:bg-slate-300 cursor-pointer">
                Image
              </td>
              <td className="w-[100px]">edit/delete</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className=" hover:bg-slate-100 border-b">
                <td className="p-2">{category._id}</td>

                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.description}</td>
                <td className="p-2">
                  <img
                    src={`.${category.imageUrl}`}
                    className="w-[75px] h-[75px]"
                    alt={category.name}
                  />
                </td>
                {/* <td className="p-2">{product.image}</td> */}
                <td className="">
                  <div className="flex gap-2">
                    <span className="hover:text-red-500 cursor-pointer">
                      <FaPencil size="20px" />
                    </span>
                    <span className="hover:text-red-500 cursor-pointer">
                      <RiDeleteBin5Fill size="20px" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategories;
