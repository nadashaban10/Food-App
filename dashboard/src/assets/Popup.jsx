import { IoAlertCircle } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
const Popup = ({ children, onClose, name, clickFunc }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700/[0.5] justify-center flex items-center z-90">
      <div className="bg-[#fff] p-[40px] rounded-md w-[600px] relative">
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
        <div className="border-l-2 border-black p-5 my-8  bg-red-100">
          <p className="font-normal">
            Are you sure you want to delete
            <span className="font-semibold">{` "${name}" ??`}</span>
          </p>
          <p className="font-normal pt-4">
            This action cannot be undone. All Values associated with this field
            will be list.
          </p>
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

        {children}
      </div>
    </div>
  );
};

export default Popup;
