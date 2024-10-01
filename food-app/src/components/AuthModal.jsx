import { useState } from 'react';

const AuthModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
  };
  const handleClose = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
  };

  return {
    isLoginOpen,
    isRegisterOpen,
    handleLoginOpen,
    handleLoginClose,
    handleRegisterOpen,
    handleRegisterClose,
    handleClose,
  };
};

export default AuthModal;