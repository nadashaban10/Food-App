import { FaCheckCircle } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
const warningData = [
  {
    msg: "succeeded",
    icon: <FaCheckCircle />,
    mainColor: "#d4edda",
    accentColor: "#5cb85c",
  },
  {
    msg: "failed",
    icon: <GoAlertFill />,
    mainColor: "#f8d7da",
    accentColor: "#d9534f",
  },
  {
    msg: "loading",
    icon: <span className="loader" />,
    mainColor: "#d1ecf1",
    accentColor: "#5bc0de",
  },
];

const Warning = ({ header, msgType, content, onClose }) => {
  const warningType = warningData.find((w) => w.msg === msgType);
  if (!warningType) return null; // Return nothing if msgType is not found
  return (
    <div
      className="bg-transparent w-[40%] z-[999] absolute top-[40px] right-[40px]  p-5 border-b-4 rounded-md"
      style={{
        backgroundColor: warningType.mainColor,
        borderColor: warningType.accentColor,
      }}
    >
      <div className="flex items-center  gap-3 p-4">
        <div
          className="text-2xl w-[50px] h-[50px] flex items-center justify-center rounded-full"
          style={{
            color: warningType.mainColor,
            backgroundColor: warningType.accentColor,
          }}
        >
          {warningType.icon}
        </div>

        <div className="pl-5 font-normal">
          <h1 className="text-2xl font-semibold uppercase">{header}</h1>
          <p>{content}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="text-gray-700 text-3xl hover:text-gray-900 absolute top-4 right-6"
      >
        &times;
      </button>
    </div>
  );
};

export default Warning;
