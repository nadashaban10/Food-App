import React, { useContext, useState } from 'react';


function MenuCard({ product }) {

  const [number, setNumber] = useState(0);
  const [color, setColor] = useState('black');
  const [clicked, setClicked] = useState(false);

  const handleIncrement = () => {
    if ('increment')
    {
    const newQuantity = number + 1;
    setNumber(newQuantity);
    setColor('#dc3545');
    setClicked(true);

    }
  };

  const handleDecrement = () => {
    if (number > 0 && number != 0 && 'decrement') {
      const newQuantity = number - 1;
      setNumber(newQuantity);
      setClicked(true);
      
      // If the quantity becomes 0, reset the button color
      if (newQuantity === 0) {
        setColor('black');
      }

      // Call updateItemQuantity with the updated quantity
      updateItemQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className='card h-[350px] w-[90%] sm:w-[300px] md:w-[250px] lg:w-[300px] bg-white rounded-xl'>
      <div className='card-image'>
        <img src={product.imageUrl} className='w-full rounded-t-xl' alt='Card Image' />
      </div>
      <div className='card-content flex flex-col justify-start m-2 pr-2' dir='rtl'>
        <div className='flex justify-between'>
          <div className='flex bg-white'>
            <button
              className={`btn w-[44px] text-white rounded-3xl pt-1 m-1 flex items-center justify-center`}
              style={{ backgroundColor: color }}
              onClick={handleIncrement}
            >
              + {clicked && number > 0 ? number : ''}
            </button>
            <button
              className='btn border border-red-600 w-[40px] text-red-500 rounded-3xl pt-1 m-1 flex items-center justify-center'
              onClick={handleDecrement}
            >
              - 
            </button>
          </div>
          <span className='card-price mt-4 font-bold ml-3 pb-1 text-red-700'>{product.price}</span>
        </div>
        <span className='line w-[97%] h-[1px] bg-gray-200 my-2'></span>
        <span className='card-title font-bold'> {product.name}</span>
        <p className='text-gray-500'> {product.description}</p>
      </div>
    </div>
  );
}

export default MenuCard;
