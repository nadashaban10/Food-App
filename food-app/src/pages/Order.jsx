import React, { useContext } from "react";
import NavBar from "../components/Header/Nav";
import Footer from "../components/Footer";
import foodimage from "/images/food-delivery (1).png";
import { motion } from "framer-motion";
function Order() {
  return (
    <>
      <div className="order w-[95%] m-5 h-[100%]">
        <NavBar color="black" />
        <div className="Breakline bg-gray-200 h-[1px] w-[99%]"></div>

        <motion.div
          className="bg-gray-100 bg-opacity-20 p-[20px] mt-4 mb-4 flex justify-center"
          initial={{ x: "-100vw" }}  // Start from off the screen (left)
          animate={{ x: 0 }}  // (0 value means) Move to the center
          transition={{ type: "spring", stiffness: 60, damping: 25, duration: 60 }}  // Slower and smoother movement
        >
          <img
            src={foodimage}
            alt="Food Delivery"
            className="w-[300px] h-auto"  // Keep image size fixed, no zoom
          />
        </motion.div>
        {/* Flex container for the left and right sections */}
        <div className="flex flex-col sm:flex-row items-start justify-between w-[100%]">
          
          {/* Left section */}
          <div className="left-sec w-full sm:w-[35%] h-[100%] p-6 ml-5 border mt-8" dir="rtl">
            <h2 className=" title flex mr-8 font-bold"> عدد العناصر</h2>
            <div className="Breakline bg-gray-200 h-[1px] mx-5 my-2"></div>
            <div className="total-items flex flex-col mx-5 my-2">
              <span>المجموع: {cartState.totalPrice.toFixed(2)}</span>
              <span>الضريبة: 5%</span>
              <span>التوصيل: 1.25</span>
              <div className="Breakline bg-gray-200 m-5 h-[1px] w-[100%]"></div>
              <span className="font-bold">اجمالي الدفع: {(cartState.totalPrice * 1.05 + 1.25).toFixed(2)}</span>
              <button className="  bg-red-800  text-white font-bold mt-4 p-2">ادفع الان</button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col space-y-5 w-full sm:w-[60%] mr-5">
            {cartState.cartItems.map((item, index) => (
              <div key={index} className="right-sec p-4 h-[100%] w-[100%]">
                <div className="order-list">
                  <div className="order-item flex items-center justify-between p-2">
                    <img
                      src={item.foodItem.imageUrl}
                      alt={item.foodItem.name}
                      className="w-[80px] h-[80px] object-cover"
                    />

                    <div className="order-quantity m-2 p-2 flex flex-row items-center">
                      <span className="block mx-2">{item.foodItem.price.toFixed(2)}</span>
                      <span className="block mx-2">السعر</span>
                      <span className="block mx-2">{item.quantity}</span>
                      <span className="block mx-2"> العدد </span>
                      <span className="block mx-2">{item.foodItem.name}</span>
                      <div className="flex bg-white">
                        <button
                          className='btn w-[44px] rounded-3xl pt-1 m-1 flex items-center justify-center'
                          onClick={() => updateItemQuantity(item.foodItem.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn border border-red-600 w-[40px] text-red-500 rounded-3xl pt-1 m-1 flex items-center justify-center"
                          onClick={() => updateItemQuantity(item.foodItem.id, item.quantity - 1)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => removeItemFromCart(item.foodItem.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
                <div className="Breakline bg-gray-200 h-[1px] w-[100%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Order;