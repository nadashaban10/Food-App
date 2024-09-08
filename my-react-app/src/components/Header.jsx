import React, { useState } from 'react';
import logo from '../../public/images/64563468_683814265373206_6935054147771170816_n.jpg';
import headerImage from '../../public/images/photo_2024-09-07_02-36-30.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menu, showMenu] = useState(false);
  const handleMenu = () => {
    showMenu(!menu);
  };

  return (
    <div className='w-full'>
      <div className='header-container w-full sm:w-[90%] md:w-[90%] mx-auto text-black'>
        <nav className='w-full'>
          <div className='flex justify-between items-center'>
            <img src={logo} className='w-[90px]' alt='logo' />
            <div className='relative flex space-x-4 mt-6 justify-center items-center'>
              <ul className='hidden md:flex space-x-5 text-2xl'>
                <li><a href='#'>تواصل معنا</a></li>
                <li><a href='#'>طلباتي</a></li>
                <li><a href='#'>افضل العروض</a></li>
                <li><a href='#'>الاصناف</a></li>
                <li><a href='#'>الرئيسيه</a></li>
              </ul>
              <FontAwesomeIcon icon={faShoppingCart} className='text-2xl pl-[30px]' />
              <FontAwesomeIcon icon={faBars} className='text-2xl md:hidden cursor-pointer sm:mr-2' onClick={handleMenu} />
              {menu && (
                <div className='absolute cursor-pointer right-0 top-full z-20 mt-2 pr-6 pt-3 pb-3 flex flex-col md:hidden space-y-2 bg-white w-[200px] font-ui-serif text-2xl justify-center items-end'>
                  <ul className='space-y-2'>
                    <li><a href='#'>تواصل معنا</a></li>
                    <li><a href='#'>طلباتي</a></li>
                    <li><a href='#'>افضل العروض</a></li>
                    <li><a href='#'>الاصناف</a></li>
                    <li><a href='#'>الرئيسيه</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
        <img src={headerImage} className='w-full h-full mt-5' alt='header' />
      </div>
    </div>
  );
}

export default Header;