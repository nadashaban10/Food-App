import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name.trim()) formErrors.name = "اسم كامل مطلوب";
    if (!formData.email) formErrors.email = "البريد الإلكتروني مطلوب";
    if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "عنوان البريد الإلكتروني غير صالح";
    if (!formData.password) formErrors.password = "كلمة المرور مطلوبة";
    if (formData.password.length < 8) formErrors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "كلمات المرور غير متطابقة";
    
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("تم إرسال النموذج بنجاح", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 rtl">
      <div className="bg-gray-700 shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-[#be0002] mb-8">إنشاء حساب</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-6 relative">
            <FaUser className="absolute right-3 top-3 text-gray-300" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.name ? "border-[#be0002]" : "border-gray-500"} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="الاسم الكامل"
            />
            {errors.name && <p className="text-[#be0002] text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-6 relative">
            <FaEnvelope className="absolute right-3 top-3 text-gray-300" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.email ? "border-[#be0002]" : "border-gray-500"} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="البريد الإلكتروني"
            />
            {errors.email && <p className="text-[#be0002] text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute right-3 top-3 text-gray-300" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.password ? "border-[#be0002]" : "border-gray-500"} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="كلمة المرور"
            />
            {errors.password && <p className="text-[#be0002] text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute right-3 top-3 text-gray-300" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.confirmPassword ? "border-[#be0002]" : "border-gray-500"} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0002] transition-colors`}
              placeholder="تأكيد كلمة المرور"
            />
            {errors.confirmPassword && <p className="text-[#be0002] text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-[#be0002] text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-[#be0002] focus:ring-opacity-50 transition-colors"
            >
              تسجيل
            </button>
          </div>

          {/* Social Media Signups */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-300 mb-4">أو سجل باستخدام</p>
            <div className="flex justify-between space-x-4">
              <button className="flex items-center justify-center w-1/2 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                Google
              </button>
              <button className="flex items-center justify-center w-1/2 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                Facebook
              </button>
            </div>
          </div>

          {/* Already have an account */}
          <div className="text-center">
            <p className="text-sm text-gray-300">
              لديك حساب بالفعل؟{" "}
              <a href="/login" className="text-[#be0002] hover:text-red-700 font-medium transition-colors">
                تسجيل الدخول
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
