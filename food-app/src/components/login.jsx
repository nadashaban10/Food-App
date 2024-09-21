import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Login = ({ handleRegisterOpen }) => {
  const { fetchLoginUser, errorMessage } = useContext(AuthContext); // Access errorMessage from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Clear previous errors
    setErrors({});

    // Call the fetchLoginUser function from context
    await fetchLoginUser(email, password);

    // If there are errors from the context, set them
    if (errorMessage) {
      setErrors({
        general: errorMessage,
      });
    }
  };

  return (
    <div className="h-[450px] flex items-center justify-center rtl">
      <div className=" p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-[#be0002] mb-5">تسجيل الدخول</h2>
        <p className="text-gray-400 p-2">يرجى إدخال بيانات حسابك لتسجيل الدخول</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <FaEnvelope className="absolute left-3 top-3 text-red-600" />
            <input
              type="email"
              className={`w-full px-10 py-3 border ${errors.email ? 'border-[#be0002]' : 'border-gray-600'} bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-[#be0002] text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-red-600" />
            <input
              type="password"
              className={`w-full px-10 py-3 border ${errors.password ? 'border-[#be0002]' : 'border-gray-600'} bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-[#be0002] text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.general && (
            <p className="text-[#be0002] text-sm mt-1 text-center">{errors.general}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#be0002] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[#a80001] transition duration-300 ease-in-out"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            ليس لديك حساب؟{' '}
            <button onClick={handleRegisterOpen} className="text-[#be0002] hover:underline">
              سجل الآن
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
