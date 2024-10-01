import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import img from '/images/hero-cover.jpg';

import Footer from '../components/Footer';
import icon1 from '../../public/images/food-delivery.png';
import icon2 from '../../public/images/delivery-man.png';
import icon3 from '../../public/images/fresh.png';
import NavBar from "../components/Header/Nav";

const Menu = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const imageHeader = img;
  const [categories, setCategories] = useState([]);
  const [AddToCartItems, setAddToCartItems] = useState(0);
  const [fooditems, setFoodItems] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
  const icones = icon1;
  const icones2 = icon2;
  const icones3 = icon3;
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/Order');
  };

  const fetchFoodItems = async () => {
    const response = await fetch('http://localhost:5000/api/fooditems');
    const data = await response.json();
    setFoodItems(data);
  };
  
  const fetchFoodItemsByCategory = async (categoryId) => {
    const response = await fetch(`http://localhost:5000/api/fooditems/category/${categoryId}`);
    const data = await response.json();
    console.log(data);
    setFoodItems(data);
  };
  
  useEffect(() => {
    // Fetch all food items on component mount
    fetchFoodItems();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === null) {
      // Fetch all food items when no category is selected
      fetchFoodItems();
    } else {
      // Fetch food items by specific category when a category is selected
      fetchFoodItemsByCategory(selectedCategory);
    }
  }, [selectedCategory]);
  

  const fetchcategories = async () => {
    const response = await fetch("http://localhost:5000/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  const scrollingToCard = () => {
    document.getElementById("cards-section").scrollIntoView({ behavior: "smooth" });
  };

 
  const handleClick = (categoryIndex) => {
    setSelectedButton(categoryIndex); // Update the selected button
  
    if (categoryIndex === null) {
      // Fetch all items when "All" button is clicked
      fetchFoodItems();
    } else {
      // Fetch food items by the selected category
      const selectedCategoryId = categories[categoryIndex]._id; // Assuming each category has an _id field
      fetchFoodItemsByCategory(selectedCategoryId);
    }
  };
  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {/* Main content */}
      <NavBar />
      <div className="flex-grow">
        <div className="relative">
          <img src={imageHeader} alt="food" className="w-full h-[300px] mb-[50px] object-cover" />
          <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50"></div>
          
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-0 mt-[50px] left-0 w-[100%] h-full flex justify-center items-start text-white text-[60px]">اطلب الان</motion.h1>
          <div className="absolute top-0 left-0 w-[100%] h-full flex justify-center items-center">
            <Link to="#" onClick={scrollingToCard}>
              <h1 className="text-xl text-[rgb(190,0,2)] font-bold p-2">المنيو</h1>
            </Link>
            <Link to="/">
              <h1 className="text-xl cursor-pointer hover:text-[rgb(190,0,2)] hover:font-bold text-white font-bold"> / الصفحة الرئيسية</h1>
            </Link>
          </div>
        </div>
        <div className="h-[200px] w-full flex justify-center bg-opacity-75 pt-5">
          <motion.img
            src={icones2}
            alt="food"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] object-cover"
          />
          <motion.img
            src={icones3}
            alt="food"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] object-cover"
          />
          <motion.img
            src={icones}
            alt="food"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
            className="w-[80px] h-[80px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] object-cover"
          />
        </div>
        <div className="category-sec flex justify-center items-center h-[150px] w-[100%] left-0 mt-[30px] bg-gray-50 bg-opacity-70">
          <div className="flex flex-wrap justify-center font-bold items-center sm:flex-col md:flex-row">
            <button
              key="all"
              className={`btn border border-white rounded-2xl p-2 m-2 ${selectedButton === null ? 'bg-[#be0002] text-white transform scale-110 p-3' : 'bg-white text-black'}`}
              onClick={() => handleClick(null)}
            >
              الكل
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`btn border border-white rounded-2xl p-2 m-2 ${selectedButton === index ? 'bg-[#be0002] text-white transform scale-110 p-3' : 'bg-white text-black'}`}
                onClick={() => handleClick(index)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          id="cards-section" className="flex justify-center h-auto w-[100%] pl-5 bg-gray-50 bg-opacity-70">
          <div className="grid w-[80%] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-5">
          {Array.isArray(fooditems) && fooditems.length > 0 ? (
            fooditems.map((product, index) => (
              <div key={index}>
                <MenuCard product={product}  />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <h1 className="text-2xl">No food items available</h1>
            </div>
          )}
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Menu;