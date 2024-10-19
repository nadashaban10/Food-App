import { IoAlertCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/reducers/productsSlice";

const Popup = ({ children, onClose, id, clickFunc }) => {
  const dispatch = useDispatch();
  const { products, loadingSelectedProduct } = useSelector(
    (state) => state.products
  );
  const [product, setProduct] = useState(
    products ? products.find((item) => item._id === id) : null
  );

  useEffect(() => {
    if (!product && id) {
      dispatch(getProductById(id)).then((response) => {
        setProduct(response.payload);
      });
    }
  }, [dispatch, id, product]);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700/[0.5] justify-center flex items-center z-90"
      onClick={onClose}
    >
      <div className="bg-[#fff] p-[40px] rounded-md w-[600px] relative">
        {loadingSelectedProduct === true || !product ? (
          <div className="loader"></div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute right-5 text-3xl font-normal hover:text-red-500 text-r "
            >
              &times;
            </button>
            <div className="flex justify-center items-center text-center text-red-600 pb-5">
              <IoAlertCircle size="60px" />
            </div>
            <h1 className="font-bold text-xl text-center">Are you sure?</h1>
            <div className="border-l-2 flex items-center border-black p-5 my-8  bg-red-100">
              <div>
                <p className="font-normal">
                  Are you sure you want to delete
                  <span className="font-semibold">{` "${product.name}" ??`}</span>
                </p>
                <p className="font-normal pt-4">
                  This action cannot be undone. All Values associated with this
                  field will be list.
                </p>
              </div>
              <div className="w-[150px] h-[150px] object-fill flex items-center">
                <img src={product.imageUrl} className="w-full shadow-md" />
              </div>
            </div>
            <div className="gap-5 flex justify-center ">
              <button
                onClick={clickFunc}
                className=" bg-red-600 p-5 rounded-md hover:bg-red-800 text-white"
              >
                Confirm Delete
              </button>
              <button
                onClick={onClose}
                className=" bg-gray-600 p-5 rounded-md hover:bg-gray-700 text-white"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
