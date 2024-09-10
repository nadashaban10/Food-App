// Hero Component
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Header from "./Header";
import { TbMenu2 } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

import { useState } from "react";

const Hero = () => {
  const { pathname } = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  return (
    <>
      <div className="w-full mx-auto relative">
        <div className="h-screen bg-cover bg-center bg-fixed bg-[url(http://localhost:5173/images/hero-cover.jpg)]">
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
          {/* ========= navbar ============= */}
          <div className="wrapper w-[80%] mx-auto p-5 relative z-100">
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
                        className={`block cursor-pointer text-white
                         hover:text-[#be0002]`}
                      >
                        تواصل معنا
                      </Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link
                        to="/menu"
                        className={`block cursor-pointer text-white
                         hover:text-[#be0002]`}
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
                      className="mr-0 w-[200px] h-auto object-contain"
                    />
                  </Link>
                </div>
              </div>
            </nav>
            <div className="flex justify-end">
              <Header />
            </div>
          </div>
          {/* ========= Menu when press burger icon =========== */}
          <div
            className={`fixed top-0 left-0 h-screen  w-[400px] bg-white bg-opacity-85 z-[110] transition-transform duration-500 ${
              showSideBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-5">
              <span
                className="cursor-pointer absolute top-5 left-[85%] text-slate-400 hover:text-slate-800"
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <IoIosCloseCircle size="40px" />
              </span>
              <Link to="/">
                <img
                  src="http://localhost:5173/images/logo.png"
                  alt="logo"
                  className="mr-0 w-[200px] h-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex p-10 text-right justify-center">
              <ul className="flex flex-col justify-end items-start gap-14 text-2xl text-right ">
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className={`block cursor-pointer text-slate-800
                         hover:text-[#be0002]`}
                  >
                    الصفحة الرئيسيه
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className={`block cursor-pointer text-slate-800
                         hover:text-[#be0002]`}
                  >
                    الصفحة الرئيسيه
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className={`block cursor-pointer text-slate-800
                         hover:text-[#be0002]`}
                  >
                    الصفحة الرئيسيه
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
