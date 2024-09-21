import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import NavBar from '../components/Header/Nav';

function ItemsByCategory() {
  const { categoryId } = useParams(); // Get categoryId from the URL
  const [foodItems, setFoodItems] = useState([]); // State for food items
  const [categoryDetails, setCategoryDetails] = useState({}); // State for category details
  const [AddToCartItems, setAddToCartItems] = useState(0); // State for cart items

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`);
      const data = await response.json();
      console.log('Category Details:', data); // Debugging log
      setCategoryDetails(data); // Set the fetched category details
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  // Fetch food items by category
  const fetchFoodItemsByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/fooditems/category/${categoryId}`);
      const data = await response.json();
      console.log('Food Items:', data); // Debugging log
      setFoodItems(data); // Set the fetched food items
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchFoodItemsByCategory();
      fetchCategoryDetails(); // Fetch category details when categoryId changes
    }
  }, [categoryId]);

  const handleClickCart = (action) => {
    if (action === "increment") {
      setAddToCartItems((prevItems) => prevItems + 1);
    } else if (action === "decrement" && AddToCartItems > 0) {
      setAddToCartItems((prevItems) => prevItems - 1);
    }
  };

  return (
    <>
      <div className="itemsbycategory flex justify-center items-center flex-col px-5" dir='rtl'>
        <NavBar color='#be0002' />
        <div className='bg-gray-200 h-[1px] w-[90%]'></div>
        <h1 className='flex justify-center font-bold text-xl items-center m-5'>{categoryDetails.name}</h1>
        
        {/* Check if imageUrls exists and is an array with at least one item */}
        {categoryDetails.imageUrls && Array.isArray(categoryDetails.imageUrls) && categoryDetails.imageUrls.length > 0 && (
          <img 
            src={`/${categoryDetails.imageUrls}`} 
            alt={categoryDetails.name} 
            className="category-image w-[700px] h-[300px] object-cover" 
          />
        )}
        
        <motion.div
          id="cards-section"
          className="flex justify-center h-auto mt-5 w-[100%] bg-gray-50 bg-opacity-30"
        >
          <div className="grid w-[80%] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-5">
            {Array.isArray(foodItems) && foodItems.length > 0 ? (
              foodItems.map((product, index) => (
                <div key={index}>
                  <MenuCard product={product} handleClickCart={handleClickCart} />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <h1 className="text-2xl">No food items available</h1>
              </div>
            )}
          </div>
        </motion.div>
      
      </div>  <Footer />
    </>
  );
}

export default ItemsByCategory;