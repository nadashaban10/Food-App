import { useState } from "react";
import { category } from "../data";
import { FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { useEffect } from "react";
const Addproducts = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log("categories: ", categories);

  const [imgPreview, setImgPreview] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
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
      setProductInfo({
        ...productInfo,
        image: file,
      });
    }
  };
  const handleRemoveImg = (e) => {
    e.stopPropagation(); // Prevent triggering the file picker
    setImgPreview(null);
    setProductInfo({ ...productInfo, image: "" });
  };

  // const save = (e) => {
  //   e.preventDefault();
  //   const { name, category, price, image, description } = productInfo;
  // };

  console.log("info: ", productInfo);
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
            <label htmlFor="description"> Description </label>
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
        </div>
        <div className="lg:w-6/12 w-full flex md:flex-col justify-center items-center md:gap-2 gap-5 bg-slate-100">
          <div className="p-5 rounded-3xl flex justify-center items-center h-full">
            <div>
              <div className="text-slate-400 text-center flex justify-center">
                <label htmlFor="image" className="cursor-pointer">
                  {imgPreview ? (
                    <div className="relative">
                      <img src={imgPreview} className="w-[100px] h-[100px]" />
                      <span
                        className="absolute -top-4 -right-[40px]"
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
                  name="image"
                  onChange={onImageChange}
                  id="image"
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
    </div>
  );
};

export default Addproducts;
