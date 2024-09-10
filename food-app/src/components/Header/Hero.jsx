import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import NavBar from "./Nav";
import { useState } from "react";

const Hero = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <div className="w-full mx-auto relative">
        {/* Hero background image */}
        <div className="h-screen bg-cover bg-center bg-fixed bg-[url(http://localhost:5173/images/hero-cover.jpg)]">
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
          {/* ========= Navbar ============= */}
          <div className="wrapper w-[90%] lg:w-[80%] mx-auto p-5 relative z-100">
            <NavBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
            <div className="flex justify-end items-center w-full h-[150px] lg:h-[120px] md:h-[100px]">
              <Header />
            </div>
          </div>

          {/* ========= Menu when pressing the burger icon =========== */}
          <div
            className={`fixed top-0 left-0 h-screen w-[250px] sm:w-[400px] bg-white z-[110] transition-transform duration-500 ${
              showSideBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-5">
              <span
                className="cursor-pointer absolute top-5 left-[80%] sm:left-[85%] text-slate-400 hover:text-slate-800"
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <IoIosCloseCircle size="40px" />
              </span>
              <Link to="/">
                <img
                  src="http://localhost:5173/images/logo.png"
                  alt="logo"
                  className="mr-0 w-[150px] sm:w-[200px] h-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex p-5 sm:p-10 text-right justify-center">
              <ul className="flex flex-col justify-end items-start gap-6 sm:gap-14 text-xl sm:text-2xl text-right">
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className="block cursor-pointer text-slate-800 hover:text-[#be0002]"
                  >
                    الصفحة الرئيسيه
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className="block cursor-pointer text-slate-800 hover:text-[#be0002]"
                  >
                    القائمة
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link
                    to="/"
                    className="block cursor-pointer text-slate-800 hover:text-[#be0002]"
                  >
                    اتصل بنا
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
