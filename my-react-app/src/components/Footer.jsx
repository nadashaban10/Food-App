import React from 'react';
import footerImage from '../../public/images/photo_2024-09-07_02-36-30.jpg';

const Footer = () => {
  return (
    <div className='footer-container w-[100%] mx-auto mt-9 bottom-0 left-0 '>
      <div
        className='footer w-full h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat relative'
        style={{ backgroundImage: `url(${footerImage})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative w-full h-full flex items-center justify-center'>
       
        </div>
      </div>
    </div>
  );
};

export default Footer;