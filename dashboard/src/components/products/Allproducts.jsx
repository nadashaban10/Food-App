import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/reducers/productsSlice";
import { useEffect, useState } from "react";
import Popup from "../../assets/Popup";
import ViewProduct from "./ViewProduct";
import Warning from "../../assets/Warning";

const AllProducts = () => {
  const [deletePop, setDeletePop] = useState(null);
  const [selectedToFullView, setSelectedToFullView] = useState(null);

  const openFullView = (id) => setSelectedToFullView(id);
  const closeFullView = () => setSelectedToFullView(null);

  const openPopup = (id) => setDeletePop(id);
  const closePopup = () => setDeletePop(null);

  const dispatch = useDispatch();
  const { products, loadingProducts } = useSelector((state) => state.products);
  const { query, results } = useSelector((state) => state.search);
  const [viewProducts, setViewProducts] = useState(products);
  // Update viewProducts based on query
  useEffect(() => {
    if (query) {
      setViewProducts(results);
    } else {
      setViewProducts(products);
    }
  }, [query, results, products]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // console.log("products: ", products);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteProduct(id));
    if (result.meta.requestStatus === "fulfilled") {
      setViewProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      closePopup();
    }
  };
  if (loadingProducts === "loading") {
    return <span className="loader"></span>;
  }

  if (loadingProducts === "failed") {
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
                Category
              </td>
              <td className="py-4 px-2 hover:bg-slate-300 cursor-pointer">
                Price
              </td>
              <td>edit/delete</td>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {viewProducts.length == 0 ? (
              <p className="text-center py-4"> No products </p>
            ) : (
              viewProducts.map((product) => (
                <tr
                  key={product._id}
                  className=" hover:bg-slate-100 border-b cursor-pointer"
                >
                  <td className="p-2 gap-2">
                    {/* <Link to={`${product._id}`}> */}
                    <div
                      className="flex justify-start items-center gap-3 w-auto"
                      onClick={() => openFullView(product._id)}
                    >
                      <img
                        src={`${product.imageUrl}`}
                        className="w-[50px] h-[50px] rounded-md"
                      />

                      <div className="w-[200px]">{product.name}</div>
                    </div>
                    {/* </Link> */}
                  </td>

                  <td className="p-2 text-center">{product.category.name}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="">
                    <div className="flex gap-2">
                      <Link to={`/products/edit/${product._id}`}>
                        <span className="hover:text-blue-500 cursor-pointer">
                          <FaPencil size="20px" />
                        </span>
                      </Link>
                      <span
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => openPopup(product._id)}
                      >
                        <RiDeleteBin5Fill size="20px" />
                      </span>

                      {/* Handle View Product ========== */}
                      {selectedToFullView && (
                        <ViewProduct
                          onClose={closeFullView}
                          id={selectedToFullView}
                        />
                      )}

                      {/* Handle Delete Product */}

                      {deletePop && (
                        <Popup
                          onClose={closePopup}
                          name={product.name}
                          clickFunc={() => handleDelete(deletePop)}
                        ></Popup>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
