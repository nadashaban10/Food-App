import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = ({ handleLoginOpen }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { fetchRegisterUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) formErrors.name = 'اسم كامل مطلوب';
    if (!email) formErrors.email = 'البريد الإلكتروني مطلوب';
    if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'عنوان البريد الإلكتروني غير صالح';
    if (!password) formErrors.password = 'كلمة المرور مطلوبة';
    if (password.length < 8) formErrors.password = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
    if (password !== confirmPassword) formErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors); // Set validation errors

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await fetchRegisterUser(name, email, password);
        if (result && result.success) {
          setSuccessMessage('تم التسجيل بنجاح! يرجى تسجيل الدخول.');
          setErrors({});
          navigate('/login'); // Redirect to login page after successful registration
        } else {
          if (result && result.error) {
            if (result.error.includes('exists')) {
              setErrors({ general: 'هذا البريد الإلكتروني مسجل بالفعل.' });
            } else {
              setErrors({ general: 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.' });
            }
          }
        }
      } catch (error) {
        setErrors({ general: 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.' });
      }
    }
  };

  return (
    <div className="h-[550px] flex items-center justify-center rtl">
      <div className="p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-[#be0002] mb-5">إنشاء حساب</h2>
        <p className="text-gray-400 p-2">يرجى إدخال بياناتك لإنشاء حساب جديد</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <FaUser className="absolute left-3 top-3 text-red-600" />
            <input
              type="text"
              className={`w-full px-10 py-3 border ${errors.name ? 'border-[#be0002]' : 'border-gray-600'} bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-[#be0002] text-sm mt-1">{errors.name}</p>}
          </div>

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

          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-red-600" />
            <input
              type="password"
              className={`w-full px-10 py-3 border ${errors.confirmPassword ? 'border-[#be0002]' : 'border-gray-600'} bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-[#be0002] text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {successMessage && <p className="text-green-600 text-sm mt-1">{successMessage}</p>}
          {errors.general && <p className="text-[#be0002] text-sm mt-1">{errors.general}</p>}

          <button
            type="submit"
            className="w-full bg-[#be0002] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[#a80001] transition duration-300 ease-in-out"
          >
            إنشاء حساب
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            لديك حساب بالفعل؟{' '}
            <button onClick={handleLoginOpen} className="text-[#be0002] hover:underline">
              تسجيل الدخول
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
