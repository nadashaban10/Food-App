import { useState } from "react";

import { FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { useEffect } from "react";
import { addProductWithImage } from "../../redux/reducers/productsSlice";

const Addproducts = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { status } = useSelector((state) => state.products);

  const [imgPreview, setImgPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // console.log("categories: ", categories);

  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
    description: "",
    richDescription: "",
    discount: "",
  });
  const handleInput = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      console.log("Image Preview URL: ", imgPreview); // Check if URL is correct
      setSelectedFile(file);

      // setProductInfo({
      //   ...productInfo,
      //   imageUrl: file,
      // });
    }
  };

  const handleRemoveImg = (e) => {
    e.stopPropagation(); // Prevent triggering the file picker
    setImgPreview(null);
    setSelectedFile(null);

    // setProductInfo({ ...productInfo, image: "" });
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("description", productInfo.description);
    formData.append("richDescription", productInfo.richDescription);
    formData.append("price", productInfo.price);
    formData.append("category", productInfo.category);
    formData.append("discount", productInfo.discount);

    if (selectedFile) {
      formData.append("imageUrl", selectedFile); // Append the file
    }
    dispatch(addProductWithImage(formData));
  };
  // const save = (e) => {
  //   e.preventDefault();
  //   const { name, category, price, image, description } = productInfo;
  // };

  console.log("product info sent: ", productInfo);
  return (
    <div className="bg-white text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl"> Add new Product</strong>
      <form className="flex flex-wrap lg:flex-nowrap  gap-10">
        <div className="lg:w-6/12 w-full">
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="name"> Product name </label>
            <input
              onChange={handleInput}
              value={productInfo.name}
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
              name="name"
              id="name"
              placeholder="Product name"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <select
              className="border px-3 py-2"
              name="category"
              value={productInfo.category}
              onChange={handleInput}
            >
              <option value="">Select a category</option>
              {categories.map((item) => (
                <option value={item._id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="price"> Price </label>
            <input
              onChange={handleInput}
              value={productInfo.price}
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
              name="price"
              id="price"
              placeholder="Price"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="discount"> Discount </label>
            <input
              onChange={handleInput}
              value={productInfo.discount}
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
              name="discount"
              id="discount"
              placeholder="Discount %"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="description">Description </label>
            <textarea
              onChange={handleInput}
              value={productInfo.description}
              type="textarea"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
              name="description"
              id="description"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="richDescription">Rich Description </label>
            <textarea
              onChange={handleInput}
              value={productInfo.richDescription}
              type="textarea"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
              name="richDescription"
              id="richDescription"
              placeholder="Rich Description"
            />
          </div>
        </div>
        <div className="lg:w-6/12 w-full h-[300px] flex md:flex-col justify-center items-center md:gap-2 gap-5 bg-slate-100">
          <div className="p-5 rounded-3xl flex justify-center items-center h-full">
            <div>
              <div className="text-slate-400  text-center flex justify-center">
                <label htmlFor="imageUrl" className="cursor-pointer">
                  {imgPreview ? (
                    <div className="relative">
                      <img
                        src={imgPreview}
                        className="w-[100px] h-[100px]"
                        alt="Preview"
                      />
                      <span
                        className="absolute -top-4 -right-[40px] cursor-pointer"
                        onClick={handleRemoveImg}
                      >
                        <IoIosCloseCircle size="30px" />
                      </span>
                    </div>
                  ) : (
                    <FaImages size="100px" />
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
              <div>
                <p className="text-center py-2">Add Image</p>
                <p className="text-center">1600 x 1200 (4:3) recommended</p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-end mt-6">
        <button
          className=" rounded-md font-semibold p-5 text-white bg-[#ff2d2d] hover:bg-slate-800 transition-all duration-300"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      <div className="bg-slate-500 border-red-500 bg-transparent h-[100px]">
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Addproducts;
