import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { addCategoryWithImg } from "../../redux/reducers/categoriesSlice";
import { useDispatch } from "react-redux";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const handleInput = (e) => {
    setCategoryInfo({
      ...categoryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImgPreview(previewUrl);
      console.log("Image Preview URL: ", previewUrl); // Check if URL is correct
      setSelectedFile(file);
    }
  };

  const handleRemoveImg = (e) => {
    e.stopPropagation(); // Prevent triggering the file picker
    setImgPreview(null);
    setSelectedFile(null);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryInfo.name);
    formData.append("description", categoryInfo.description);
    if (selectedFile) {
      formData.append("imageUrl", selectedFile); // Append the file
    }

    dispatch(addCategoryWithImg(formData));
    console.log("data from ui:", formData);
  };
  // console.log("category: ", categoryInfo);

  return (
    <div className="bg-white text-slate-800 p-8 rounded-md shadow-sm">
      <strong className="text-xl">Create new category</strong>
      <form className="flex flex-wrap lg:flex-nowrap gap-10">
        <div className="lg:w-6/12 w-full">
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="name">Category name</label>
            <input
              onChange={handleInput}
              value={categoryInfo.name}
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500"
              name="name"
              id="name"
              placeholder="Category name"
            />
          </div>
          <div className="flex flex-col gap-1 m-2 w-full">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleInput}
              value={categoryInfo.description}
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500"
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
          onClick={(e) => handleAddCategory(e, categoryInfo)}
        >
          Add category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
