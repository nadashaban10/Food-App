// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/reducers/productsSlice";
import { RiCloseCircleLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const ViewProduct = ({ onClose, id }) => {
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
  console.log("selected product: ", product);

  // if (loadingSelectedProduct === "loading" || !product) {
  //   return <span className="loader"></span>;
  // }
  // if (!product) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 scroll-m-3 bg-gray-700/[0.5] justify-center flex items-center z-90"
      onClick={onClose}
    >
      <div className="bg-[#fff] p-[40px] max-h-[90vh] overflow-y-auto rounded-md w-[600px] lg:w-[70%] relative">
        <div>
          {loadingSelectedProduct === true || !product ? (
            <div className="loader"></div>
          ) : (
            <>
              <div className=" bg-slate-800 p-5 rounded-md text-white shadow-md  text-3xl">
                <div className="relative flex w-full">
                  <h1>Product Details</h1>
                  <span
                    onClick={onClose}
                    className="absolute right-3 hover:text-red-600 cursor-pointer"
                  >
                    <RiCloseCircleLine />
                  </span>
                </div>
              </div>

              <div className="my-4 flex flex-wrap xl:justify-between justify-center gap-3 p-4">
                {/* Left Column */}
                <div className="w-full p-2">
                  <div className="flex justify-start lg:gap-10 md:gap-0 w-full flex-wrap">
                    <h1 className="text-2xl uppercase  ">{product.name}</h1>
                    <h1 className="text-2xl uppercase lg:mr-[100px] ">
                      {product.price}£
                    </h1>
                  </div>

                  <div className="p-2 bg-[#f6f6f6] rounded-md mt-4 flex flex-wrap justify-start gap-10">
                    <h2 className="text-md">Product Category</h2>
                    <p className="font-light">{product.category.name}</p>
                  </div>
                  <div className="p-2 bg-[#f6f6f6] rounded-md mt-4 flex flex-wrap justify-start gap-10">
                    <h2 className="text-md">Size Options</h2>
                    <div className="flex-col">
                      {Object.entries(product.sizeOptions).map(
                        ([key, value]) => (
                          <div key={key} className="pt-2">
                            <span className="p-2">{key}:</span>
                            <span className="font-light">{value}£</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Second Column */}
                <div className="w-full flex items-center flex-wrap justify-between">
                  <div className=" mt-[20px] justify-center object-cover items-center p-2 bg-[#eee] border-1 border-slate-800 rounded-md cursor-pointer">
                    <img
                      src={product.imageUrl}
                      className="w-[200px] h-[200px] object-cover"
                    />
                  </div>
                  <div className="mt-[20px] xl:h-[200px] flex-wrap flex justify-center items-center p-2 bg-[#eee] border-1 border-slate-800 rounded-md cursor-pointer gap-3">
                    {product.imageUrls.map((item, index) => (
                      <div className=" " key={index}>
                        <img
                          src={item}
                          className=" w-[150px] h-[150px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2">
                <h2 className="border-b-2 text-xl">Product Description</h2>
                <p className="py-4 font-light">{product.description}</p>
              </div>
              <div className="p-2">
                <h2 className="border-b-2 text-xl">Long Description</h2>
                <p className="py-4 font-light">{product.richDescription}</p>
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className=" bg-gray-600 p-5 rounded-md hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
