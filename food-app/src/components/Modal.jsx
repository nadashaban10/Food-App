import React from 'react';

const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white w-full max-w-md mx-auto p-8 transform scale-95 transition-transform duration-300 ease-in-out relative">
        <button
          className="absolute top-2 right-2 text-xl m-5 text-gray-500 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
