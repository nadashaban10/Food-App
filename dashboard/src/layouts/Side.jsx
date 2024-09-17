import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
const Side = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [submenu, setSubMenu] = useState(false);

  const submenuOpen = () => {
    setSubMenu(!submenu);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const menuItems = [
    {
      name: "Products",
      path: "/products",
      icon: <IoCubeOutline size="25px" />,
      submenu: true,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <BiCategory size="25px" />,
      submenu: false,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <MdOutlineShoppingCart size="25px" />,
      submenu: false,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <LuUsers size="25px" />,
      submenu: false,
    },
  ];
  return (
    <header
      className={`h-screen sticky top-0 transform transition-all duration-700 ease-in-out ${
        isOpen ? "translate-x-0 w-[300px]" : " w-[100px]"
      } bg-gray-900`}
    >
      <div
        className="text-white bg-slate-500 h-[50px] rounded-full flex justify-center items-center w-[50px] absolute top-6 -right-5 cursor-pointer hover:opacity-90 transition-all duration-300"
        onClick={toggle}
      >
        <span>
          {isOpen ? (
            <MdOutlineKeyboardArrowRight size="25px" />
          ) : (
            <MdOutlineKeyboardArrowLeft size="25px" />
          )}
        </span>
      </div>
      <div
        className={`pt-14 mt-3 text-center cursor-pointer ${
          isOpen ? "block " : "hidden"
        }`}
      >
        <h1 className="text-gray-100 text-[25px] px-5 pb-9">Admin Dashboard</h1>
      </div>
      <nav
        className={`${
          isOpen ? "" : "mt-14"
        } pt-[5px] text-gray-300 px-1 text-xl flex-col`}
      >
        <p className="uppercase tracking-widest text-gray-600 p-5">main</p>

        {menuItems.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.path}
              key={index}
              className={`cursor-pointer p-5 rounded custom-hover-effect hover:bg-slate-500/30 flex gap-5 items-center ${
                isOpen ? "justify-between" : "justify-center"
              } 
            `}
              activeclassName="active"
            >
              {" "}
              <div className="flex gap-5 justify-start">
                <div className="">{item.icon}</div>
                <div className={`${isOpen ? "block" : "hidden"}`}>
                  {item.name}
                </div>
              </div>
              {item.submenu && isOpen ? (
                <div className=" flex justify-center items-center">
                  <span onClick={submenuOpen} className="pr-5">
                    <RiArrowDropDownLine size="40px" />
                  </span>
                </div>
              ) : (
                ""
              )}
            </NavLink>
            {submenu && item.submenu ? (
              <div className={`flex px-5 py-2 ${isOpen ? "block" : "hidden"}`}>
                <ul className="">
                  <li className="py-2 hover:text-slate-600 cursor-pointer">
                    item 1
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Side;
