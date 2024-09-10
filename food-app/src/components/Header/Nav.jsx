import { Link, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { TbMenu2 } from "react-icons/tb";
import { useState } from "react";

const NavBar = ({ setShowSideBar, showSideBar }) => {
  const { pathname } = useLocation(); 

  return (
    <nav className="w-full flex items-center lg:justify-between relative">
      <div className="flex lg:justify-between justify-between items-center w-full">
        {/* ==== icons ==== */}
        <div className="flex gap-5">
          <div className="flex  justify-center items-center gap-5">
            <div className="flex justify-center gap-5">
              {/* Wishlist */}
              <div className="flex relative justify-center items-center cursor-pointer rounded-full w-[50px] h-[50px] bg-[#be0002] text-white hover:bg-[#be00037b]">
                <span className="text-2xl">
                  <FaRegHeart />
                </span>
              </div>
              {/* Shopping Cart */}
              <div className="flex relative justify-center items-center cursor-pointer rounded-full w-[50px] h-[50px] bg-[#be0002] text-white hover:bg-[#be00037b]">
                <span className="text-2xl">
                  <FiShoppingCart />
                </span>
              </div>
            </div>
            <div
              className="lg:hidden cursor-pointer"
              onClick={() => setShowSideBar(!showSideBar)}
            >
              <span>
                <TbMenu2 size="40px" color="#fff" />
              </span>
            </div>
          </div>
        </div>

        {/* ====== menu list  on Large Screen ==== */}
        <div className="lg:flex items-center pt-8 mr-10 hidden ">
          <ul className="flex justify-end items-start gap-14 text-2xl text-right ">
            <li className="cursor-pointer">
              <Link
                to="/menu"
                className={`block cursor-pointer text-white hover:text-[#be0002]`}
              >
                تواصل معنا
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link
                to="/menu"
                className={`block cursor-pointer text-white hover:text-[#be0002]`}
              >
                المنيو
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link
                to="/"
                className={`block cursor-pointer ${
                  pathname === "/" ? "text-white" : "text-slate-600"
                } hover:text-[#be0002]`}
              >
                الصفحة الرئيسيه
              </Link>
            </li>
          </ul>
        </div>

        {/* ======== logo ======= */}
        <div className="ml-4 ">
          <Link to="/">
            <img
              src="http://localhost:5173/images/logo.png"
              alt="logo"
              className="mr-0 w-[150px] h-auto object-contain mb-5"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;