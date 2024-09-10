import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t-2 border-[#be0002] w-full mt-6 rtl:text-right" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-6 md:space-y-0">
          {/* Open Hours */}
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-4 text-[#be0002] border-b-2 border-[#be0002] inline-block pb-1">
              ساعات العمل
            </h4>
            <ul className="space-y-2">
              <li>من الإثنين إلى الجمعة: <span className="font-semibold">9 ص - 6 م</span></li>
              <li>السبت: <span className="font-semibold">10 ص - 4 م</span></li>
              <li>الأحد: <span className="font-semibold">مغلق</span></li>
            </ul>
          </div>

          {/* Location */}
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-4 text-[#be0002] border-b-2 border-[#be0002] inline-block pb-1">
              الموقع
            </h4>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#be0002] transition-colors duration-300 text-lg font-medium"
              >
                مثال شارع، مدينة، بلد
              </a>
              <FaMapMarkerAlt className="text-[#be0002] text-2xl" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-4 text-[#be0002] border-b-2 border-[#be0002] inline-block pb-1">
              تواصل معنا
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaPhoneAlt className="text-[#be0002] text-2xl" />
                <a href="tel:+1234567890" className="text-white hover:text-[#be0002] transition-colors duration-300 text-lg font-medium">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaEnvelope className="text-[#be0002] text-2xl" />
                <a href="mailto:info@example.com" className="text-white hover:text-[#be0002] transition-colors duration-300 text-lg font-medium">
                  info@example.com
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaGlobe className="text-[#be0002] text-2xl" />
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#be0002] transition-colors duration-300 text-lg font-medium">
                  www.example.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} . جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;