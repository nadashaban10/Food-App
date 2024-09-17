import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { products } from "../data";

const Allproducts = () => {
  return (
    <div className="bg-white text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl"> All Products</strong>
      <div>
        <table className="mt-5 table-fixed w-full">
          <thead>
            <tr className=" bg-slate-100 text-slate-800 font-semibold ">
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Product Id
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                <span></span>Product Name
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Category
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Price
              </td>
              <td>edit/delete</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className=" hover:bg-slate-100 border-b">
                <td className="p-2">{product.id}</td>
                <td className="p-2">
                  <Link to="/">{product.name}</Link>
                </td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.price}</td>
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
        <button className="bg-slate-400 h-fit w-fit p-5 mt-8 rounded-sm">
          Add product
        </button>
      </div>
    </div>
  );
};

export default Allproducts;
