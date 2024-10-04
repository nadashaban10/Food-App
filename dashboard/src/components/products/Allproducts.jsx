import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsSlice";
import { useEffect } from "react";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // console.log("products: ", products);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load products.</p>;
  }

  return (
    <div className="bg-white text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl"> All Products</strong>
      <div>
        <table className="mt-5 table-fixed w-full">
          <thead>
            <tr className=" bg-slate-100 text-slate-800 font-semibold ">
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Name
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
              <tr
                key={product._id}
                className=" hover:bg-slate-100 border-b cursor-pointer"
              >
                <td className="p-2 gap-2">
                  <Link to={`${product._id}`}>
                    <div className="flex justify-center items-center gap-2 w-[200px]">
                      <img
                        src="/images/181204_Olive-Magazine_Berenjak_201-9c70cd3.jpg"
                        className="w-[100px] rounded-md"
                      />

                      <div className="w-[100px]">{product.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2 font-semibold">{product.category.name}</td>
                <td className="p-2">{product.price}</td>
                <td className="">
                  <div className="flex gap-2">
                    <Link to={`/products/edit/${product._id}`}>
                      <span className="hover:text-blue-500 cursor-pointer">
                        <FaPencil size="20px" />
                      </span>
                    </Link>
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

export default AllProducts;
