import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <button
        className="bg-white text-[#be0002] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#be0002] hover:text-white transition duration-300 ease-in-out"
        onClick={() => setIsModalOpen(true)}
      >
        تسجيل الدخول
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="bg-gray-800 rounded-lg shadow-lg w-96 p-8 transform scale-95 transition-transform duration-300 ease-in-out relative">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#be0002]">تسجيل الدخول</h2>
              <p className="text-gray-400">يرجى إدخال بيانات الاعتماد الخاصة بك للمتابعة</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="w-full px-10 py-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6 relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  className="w-full px-10 py-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-sm text-gray-400">تذكرني</label>
                </div>
                <a href="#" className="text-sm text-[#be0002] hover:underline">هل نسيت كلمة المرور؟</a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#be0002] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[#a80001] transition duration-300 ease-in-out"
              >
                تسجيل الدخول
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-400">لا تملك حساباً؟ <a href="#" className="text-[#be0002] hover:underline">سجل الآن</a></p>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
