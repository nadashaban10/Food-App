import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Ensure this is imported from 'react-router-dom'
import icon1 from '../../public/images/food-delivery.png';
import icon2 from '../../public/images/delivery-man.png';
import icon3 from '../../public/images/fresh.png';

function Categories() {
  const icones = icon1;
  const icones2 = icon2;
  const icones3 = icon3;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]); // Added state to store fetched food items

  const fetchFoodItemsByCategory = async (categoryId) => {
    if (!categoryId) return; // Ensure categoryId is valid
    const response = await fetch(`http://localhost:5000/api/fooditems/category/${categoryId}`);
    const data = await response.json();
    console.log(data);
    setFoodItems(data);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFoodItemsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    // Navigate to ItemsByCategory page with the categoryId as a URL parameter
    navigate(`/itemsbycategory/${categoryId}`);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-[85%] mx-auto " dir="rtl">
      {/* Categories Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-9 ml-5 mr-5">
        {categories.map((category, index) => (
          <motion.div
            onClick={() => handleCategoryClick(category._id)} // Pass category ID
            key={category._id} // Ensure unique key
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#be0002] w-full border rounded-xl hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-between"
          >
            <div className="overflow-hidden w-full h-[200px]">
              <img
                src={category.imageUrls}
                alt={category.name}
                className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold mt-2 text-white">{category.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
