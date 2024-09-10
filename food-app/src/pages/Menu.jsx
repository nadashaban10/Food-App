import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import img from '/images/hero-cover.jpg';
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Menu = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const products = [1, 2, 3, 4, 5, 6, 7, 8];
  const imageHeader = img;
  const categoreis = [" السلطات و المقبلات ","المكرونات", "محاشي وممبار","السندوتشات" ,"الطواجن", "المشويات", "الجريل", "الكل"];
  const [AddToCartItems, setAddToCartItems] = useState(0);

  const scrollingToCard = () => {
    document.getElementById("cards-section").scrollIntoView({ behavior: "smooth" });
  };

  const handleClickCart = () => {
    setAddToCartItems(AddToCartItems + 1);
  };

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  return (
    <>
      <div className="relative"> 
        <img src={imageHeader} alt="food" className="w-full h-[300px] mb-[50px] object-cover" />
        <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50"></div>
        <div className="top-0 right-0 flex justify-end items-start gap-5 p-5 fixed cursor-pointer">
          {/* Wishlist */}
          <div className="flex relative justify-center items-center cursor-pointer rounded-full w-[50px] h-[50px] bg-[#be0002] text-white hover:bg-[#be00037b]">
            <span className="text-2xl">
              <FaRegHeart />
              <span className='absolute top-0 right-0 text-[15px] font-bold bg-white pt-1 text-[#be0002] rounded-full w-[20px] h-[20px] flex justify-center items-center'>0</span>
            </span>
          </div>
          {/* Shopping Cart */}
          <div className="flex relative justify-center items-center rounded-full w-[50px] h-[50px] bg-[#be0002] text-white hover:bg-[#be00037b]">
            <span className="text-2xl">
            <Link> <FiShoppingCart /> </Link>
              <span className='absolute top-0 right-0 text-[15px] font-bold bg-white pt-1 text-[#be0002] rounded-full w-[20px] h-[20px] flex justify-center items-center'>{AddToCartItems}</span>
            </span>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-[100%] h-full flex justify-center items-center">
          <Link to="#" onClick={scrollingToCard}>
            <h1 className="text-2xl text-[#be0002] font-bold p-2">المنيو </h1>
          </Link>
          <Link to="/">
            <h1 className="text-2xl hover:text-[#be0002] hover:font-bold text-white font-bold"> / الصفحة الرئيسية </h1>
          </Link>
        </div>
      </div>
      <div className="category-sec flex justify-center items-center[h-150px] w-[100%] left-0 mt-[100px]">
        <div className="flex justify-center font-bold items-center">
          {categoreis.map((category, index) => (
            <button
              key={index}
              className={`btn bg-white-600 bg-white border border-white rounded-2xl p-2 m-2 ${selectedButton === index ? 'bg-[rgb(190,0,2)] text-white border  transform scale-110 p-3' : ' text-black'}`}
              onClick={() => handleClick(index)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <h1 className="text-2xl text-center font-bold mt-[100px] mb-[40px]">اطلب الأن </h1>
      
      <div id="cards-section" className="flex justify-center h-screen w-[100%] pl-5 bg-gray-100 mt-4">
        <div className="grid w-[80%] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
          {products.map((product, index) => (
            <MenuCard key={index} handleClickCart={handleClickCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;