import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/reducers/categoriesSlice";
import { useEffect } from "react";
import {
  addProductWithImage,
  resetLoadingState,
} from "../../redux/reducers/productsSlice";
import Warning from "../../assets/Warning";

const Addproducts = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { loadingAddProduct } = useSelector((state) => state.products);

  const [imgPreview, setImgPreview] = useState(null);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const closeWarning = () => {
    dispatch(resetLoadingState());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // console.log("categories: ", categories);

  const [productInfo, setProductInfo] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
    imageUrls: [],
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
      console.log("Image Preview URL: ", URL.createObjectURL(file)); // Log directly
      setSelectedFile(file);
    }
  };
  const onImagesChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array

    if (newFiles.length > 0) {
      // Combine old files with new files
      const updatedFiles = [...selectedFiles, ...newFiles];

      const previews = updatedFiles.map((file) => URL.createObjectURL(file)); // Map each file to a preview URL
      setImgsPreview(previews);
      setSelectedFiles(updatedFiles); // Set array of files
      // console.log("Images Preview: ", previews);
    }
  };

  const handleRemoveImg = (e) => {
    e.stopPropagation();
    setImgPreview(null);
    setSelectedFile(null);

    // setProductInfo({ ...productInfo, image: "" });
  };
  const handleRemoveImgs = (index) => {
    // Remove image from preview array
    const updatedPreview = imgsPreview.filter((_, i) => i !== index);
    setImgsPreview(updatedPreview);

    const updatedFiles = Array.from(selectedFiles).filter(
      (_, i) => i !== index
    );
    setSelectedFiles(updatedFiles);
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

    // if (selectedFiles) {
    //   formData.append("imageUrls", selectedFiles); // Append the images
    // }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("imageUrls", file));
    }
    dispatch(addProductWithImage(formData));
  };

  return (
    <div className="bg-white overflow-hidden text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl"> Add new Product</strong>
      <form className="flex flex-wrap lg:flex-nowrap  gap-10">
        <div className="lg:w-6/12 w-full">
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="name"> Product name </label>
            <input
              onChange={handleInput}
              value={productInfo.name}
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 bg-[#eee] rounded-md"
              name="name"
              id="name"
              placeholder="Product name"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <select
              className="border px-3 py-2 bg-[#eee] rounded-md"
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
              type="number"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 bg-[#eee] rounded-md "
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
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 bg-[#eee] rounded-md "
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
        <div className="lg:w-6/12">
          <p className="pb-3">Main image</p>
          <div className=" h-[300px] flex md:flex-col justify-center items-center md:gap-2 gap-5 bg-slate-100  border-dashed border-2 rounded-md">
            <div className="p-5 rounded-3xl flex justify-center items-center h-full">
              <div>
                <div className="text-slate-400  text-center flex justify-center">
                  <label htmlFor="imageUrl" className="cursor-pointer">
                    {imgPreview ? (
                      <div className="relative">
                        <img
                          src={imgPreview}
                          className="w-[200px] h-[200px] object-cover rounded-md shadow-md"
                          alt="Preview"
                        />
                        <div
                          className="absolute -top-4 -right-[40px] cursor-pointer"
                          onClick={handleRemoveImg}
                        >
                          <IoIosCloseCircle size="30px" />
                        </div>
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
                  {!imgPreview && <p className="text-center py-2">Add Image</p>}
                  <p className="text-center py-3">
                    1600 x 1200 (4:3) recommended
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="p-3">Other Images</p>

          <div className="h-[100px] w-[100px] flex md:flex-col justify-center items-center md:gap-2 gap-5 rounded-md bg-slate-100 border-dashed border-2">
            <div className="text-center justify-center items-center">
              <div className="text-slate-400">
                <label htmlFor="imageUrls" className="cursor-pointer">
                  <FaCloudUploadAlt size="40px" color="#94a3b8" />
                </label>
                <input
                  type="file"
                  onChange={onImagesChange}
                  name="imageUrls"
                  id="imageUrls"
                  multiple
                  className="hidden"
                />
              </div>
              {/* <div className=" flex justify-center items-center pt-4">
                 <p className="text-center py-2">Add Image</p> 
                
              </div> */}
            </div>
          </div>

          {imgsPreview.length > 0 && (
            <div className="flex justify-start flex-wrap mt-5 rounded-md  bg-slate-100 items-center gap-5 p-4">
              {imgsPreview.map((preview, index) => (
                <div
                  key={index}
                  className="relative rounded-md p-2 flex justify-center"
                >
                  <img
                    src={preview}
                    className="w-[100px] h-[100px] shadow-md object-cover hover:scale-110 duration-500 transition-all rounded-md"
                    alt={`Preview ${index}`}
                  />
                  <span
                    className="absolute -top-1 -right-[5px] cursor-pointer text-slate-400"
                    onClick={() => handleRemoveImgs(index)}
                  >
                    <IoIosCloseCircle size="25px" />
                  </span>
                </div>
              ))}
            </div>
          )}
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

      {loadingAddProduct != "idle" && (
        <Warning
          header={loadingAddProduct}
          msgType={loadingAddProduct}
          content={
            loadingAddProduct === "succeeded"
              ? "Your product was added successfully."
              : loadingAddProduct === "loading"
              ? "Please wait while your product is being uploaded."
              : "Product upload failed. Please try again."
          }
          onClose={closeWarning}
        />
      )}
      {/* <div className="bg-slate-500 border-red-500 bg-transparent h-[100px]">
        <p>{status}</p>
      </div> */}
    </div>
  );
};

export default Addproducts;
