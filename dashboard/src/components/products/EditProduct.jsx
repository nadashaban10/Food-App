import { useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/reducers/productsSlice";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { FaImages } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

const EditProduct = () => {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const { id } = useParams();

  const { products, loadingSelectedProduct } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Get Product info from all product
  const [product, setProduct] = useState(
    products ? products.find((item) => item._id === item.id) : null
  );

  useEffect(() => {
    if (product) {
      setImgPreview(product.imageUrl);
      setImgsPreview(product.imageUrls);
    }
  }, [product, dispatch]);

  // Set Product Image and image Preview
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setSelectedImg(file);
    }
  };

  const handleRemoveImg = (e) => {
    e.stopPropagation();
    setImgPreview(null);
    setSelectedImg(null);
  };
  const handleRemoveImgs = (index) => {
    // Update Images Preview =======>
    const updatedPreview = imgsPreview.filter((_, i) => i !== index);
    setImgsPreview(updatedPreview);

    // update files
    // const updatedFiles = Array.from(selec)
  };
  const handleInputChange = (e) => {
    // destructuring the event e.target.name and e.target.value
    const { name, value } = e.target;
    // Update the state according to previous state
    //

    setProduct((prevProduct) => ({
      // Spread Operator: copies all prop from prev into new obj
      // This ensures that we don’t accidentally overwrite the entire product object but only modify the fields that need to be updated.
      ...prevProduct,
      // is used to dynamically specify which field of the prevProduct object needs to be updated
      [name]: name === "category" ? { _id: value } : value, // Update category using its _id
    }));
  };

  useEffect(() => {
    if (!product && id) {
      dispatch(getProductById(id)).then((response) => {
        setProduct(response.payload);
      });
    }
  }, [dispatch, id, product]);

  // console.log("selected: ", product);

  return (
    <>
      {loadingSelectedProduct === true || !product ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="w-[90%] mx-auto my-[80px]">
            <div className="bg-white overflow-hidden text-slate-800 p-8 flex gap-2 items-center rounded-md shadow-sm">
              <strong className="text-2xl"> Edit Product</strong>
              <FaPencil size="20px" />
            </div>

            <div className="flex justify-center">
              <form className="flex flex-wrap lg:flex-nowrap lg:w-8/12  gap-40">
                <div className="w-full">
                  {/* ===== Name input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="name" className="font-semibold">
                      {" "}
                      Product name{" "}
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={product.name}
                      type="text"
                      className="w-full px-3 py-4 border border-slate-200 outline-none focus:border-black bg-[#eee] rounded-md"
                      name="name"
                      id="name"
                      placeholder="Product name"
                    />
                  </div>

                  {/* ===== Category input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="category" className="font-semibold">
                      {" "}
                      Category{" "}
                    </label>
                    <select
                      className="border px-3 py-4 bg-[#eee] rounded-md"
                      name="category"
                      value={product.category ? product.category._id : ""}
                      onChange={handleInputChange}
                    >
                      <option value={product.category}>
                        {product.category.name}
                      </option>
                      {categories.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ===== Price input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="price" className="font-semibold">
                      {" "}
                      Price{" "}
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={product.price}
                      type="number"
                      className="w-full px-3 py-4 border border-slate-200 outline-none focus:border-black bg-[#eee] rounded-md"
                      name="price"
                      id="price"
                      placeholder="Price"
                    />
                  </div>
                  {/* ===== Discount input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="discount" className="font-semibold">
                      {" "}
                      Discount %
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={product.discount}
                      type="number"
                      className="w-full px-3 py-4 border border-slate-200 outline-none focus:border-black bg-[#eee] rounded-md"
                      name="discount"
                      id="discount"
                      placeholder="Discount %"
                    />
                  </div>
                  {/* ===== Description input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="description" className="font-semibold">
                      {" "}
                      Description
                    </label>
                    <textarea
                      onChange={handleInputChange}
                      value={product.description}
                      type="text"
                      className="w-full px-3 py-4 border border-slate-200 outline-none focus:border-black bg-[#eee] rounded-md h-auto"
                      name="description"
                      id="description"
                      placeholder="Description"
                      rows="4"
                    />
                  </div>
                  {/* ===== Rich Description input====== */}
                  <div className="flex flex-col gap-1 pt-5 m-2 w-full">
                    <label htmlFor="richDescription" className="font-semibold">
                      Rich Description
                    </label>
                    <textarea
                      onChange={handleInputChange}
                      value={product.richDescription}
                      type="text"
                      className="w-full px-3 py-4 border border-slate-200 outline-none focus:border-black bg-[#eee] rounded-md h-auto"
                      name="richDescription"
                      id="richDescription"
                      placeholder="richDescription"
                      rows="8"
                    />
                  </div>
                  <div className="mt-5 py-10">
                    <p className="font-semibold text-xl p-3 mb-5">
                      Product Images
                    </p>
                    {/* IMAGE preview */}
                    <div>
                      <p className="font-semibold text-lg  bg-slate-800 text-white items-center text-center py-3 mb-5">
                        Main Image
                      </p>
                      <label htmlFor="imageUrl" className="cursor-pointer">
                        {imgPreview ? (
                          <div className="relative flex justify-center mt-4">
                            <img
                              src={imgPreview}
                              className="w-[400px] h-[400px] object-cover rounded-md shadow-md hover:scale-110  duration-500 transition-all "
                              alt="Preview"
                            />
                            <div
                              className="absolute -top-[5px] right-[100px] cursor-pointer text-3xl"
                              onClick={handleRemoveImg}
                            >
                              &times;
                            </div>
                          </div>
                        ) : (
                          <div className="text-[#94a3b8] flex justify-center w-[50%] mx-auto border-dashed border-2 p-[70px]">
                            <FaImages size="100px" />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        name="imageUrl"
                        onChange={onImageChange}
                        id="imageUrl"
                        className="hidden"
                      />
                    </div>

                    {/* Imagesssss Preview =======  */}

                    <div className="mt-5">
                      <p className="font-semibold text-lg bg-slate-800 items-center text-center text-white py-3 mb-5">
                        Other images ...
                      </p>

                      <label htmlFor="imageUrls" className="cursor-pointer">
                        <div className="flex items-center gap-5 ">
                          <div className="text-slate-400 border-dashed border-2 w-[100px] h-[100px] flex justify-center items-center ">
                            <label
                              htmlFor="imageUrls"
                              className="cursor-pointer"
                            >
                              <FaCloudUploadAlt size="40px" color="#94a3b8" />
                            </label>
                            <input
                              type="file"
                              // onChange={onImagesChange}
                              name="imageUrls"
                              id="imageUrls"
                              multiple
                              className="hidden"
                            />
                          </div>

                          {imgsPreview.map((preview, index) => (
                            <div
                              key={index}
                              className="relative rounded-md p-2 flex justify-center"
                            >
                              <img
                                src={preview}
                                className="w-[150px] h-[150px] shadow-md object-cover hover:scale-110 duration-500 transition-all rounded-md p-2"
                                alt={`Preview ${index}`}
                              />
                              <span
                                className="absolute -top-3 -right-[5px] cursor-pointer text-slate-400 text-3xl"
                                onClick={() => handleRemoveImgs(index)}
                              >
                                &times;
                              </span>
                            </div>
                          ))}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className=" rounded-md font-semibold p-5 mb-[20px] text-white bg-[#ff2d2d] hover:bg-slate-800 transition-all duration-300"
                // onClick={handleAddProduct}
              >
                Save Product
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProduct;
