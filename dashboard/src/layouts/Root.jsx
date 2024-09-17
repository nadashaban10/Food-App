import { Outlet } from "react-router-dom";
import Side from "./Side";

const Root = () => {
  return (
    <>
      <div className="flex ">
        <Side />
        <div className="bg-gray-100 flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
