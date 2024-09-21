import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state
  const navigate = useNavigate();

  const fetchLoginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Pass email and password to the request
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        login(data.token); // Call login to store token and update auth status
        navigate('/Order'); // Redirect user after login
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Check if the user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Use navigate for navigation
  };

  // In AuthContext.js
const fetchRegisterUser = async (name, email, password, confirmPassword) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();

    if (response.status === 409) {
      // User already exists
      setErrorMessage(data.message);
 
    } else if (response.ok) {
      // Registration successful, proceed with login or redirect
      console.log('Registration successful:', data);
    } else {
      // Set other error messages
      setErrorMessage(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    setErrorMessage('An error occurred. Please try again.');
  }
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, fetchLoginUser, errorMessage, fetchRegisterUser}}>
      {children}
    </AuthContext.Provider>
  );
};
