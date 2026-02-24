// src/contexts/ToastContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomToast from '../components/CustomToast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ 
    message: '', 
    visible: false, 
    status: false 
  });

  const showToast = useCallback((message, status) => {
    console.log('Showing toast:', message, status); // Debug log
    setToast({ message, visible: true, status });
    
    // Hide toast after 3 seconds (more reasonable duration)
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <CustomToast 
        message={toast.message} 
        visible={toast.visible} 
        status={toast.status}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};