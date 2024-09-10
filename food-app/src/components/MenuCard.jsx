import React, { useState } from 'react';
import img from '/images/images.jpg';

const imageCard = img;

function MenuCard({ handleClickCart }) {
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState('black');
  const [clicked, setClicked] = useState(false);

  const handleIncrement = () => {
    setNumber(number + 1);
    setColor('#dc3545');
    setClicked(true);
  };

  const handleDecrement = () => {
    if (number > 0) {
      setNumber(number - 1);
      setClicked(true);
      if (number - 1 === 0) {
        setColor('black');
      }
    }
  };

  return (
    
    <div className='card h-[350px] w-[90%] sm:w-[300px] md:w-[250px] lg:w-[300px] bg-white rounded-xl'>
       
      <div className='card-image'>
        <img src={imageCard} className='w-full rounded-t-xl' alt='Card Image' /> 
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
              - {clicked && number > 0 }
            </button>
          </div>
          <span className='card-price mt-4 font-bold ml-3 pb-1 text-red-700'>200.00 Egp</span>
        </div>
        <span className='line w-[97%] h-[1px] bg-gray-200 my-2'></span>
        <span className='card-title font-bold'>كفته مشويه</span>
        <p className='text-gray-500'>الوصف : لحم مشوي لذيذ مع توابل خاصة</p>
      </div>
    </div>
  );
}

export default MenuCard;