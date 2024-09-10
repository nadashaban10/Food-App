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
    
    if (!formData.name.trim()) formErrors.name = "Full name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email address is invalid";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password.length < 8) formErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match";
    
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-6 relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.name ? "border-red-600" : "border-gray-600"} bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-6 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.email ? "border-red-600" : "border-gray-600"} bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.password ? "border-red-600" : "border-gray-600"} bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-10 py-3 border ${errors.confirmPassword ? "border-red-600" : "border-gray-600"} bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
              Register
            </button>
          </div>

          {/* Social Media Signups */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-400 mb-4">Or sign up with</p>
            <div className="flex justify-between space-x-4">
              <button className="flex items-center justify-center w-1/2 py-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors">
                Google
              </button>
              <button className="flex items-center justify-center w-1/2 py-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors">
                Facebook
              </button>
            </div>
          </div>

          {/* Already have an account */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 hover:text-red-500 font-medium transition-colors">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
