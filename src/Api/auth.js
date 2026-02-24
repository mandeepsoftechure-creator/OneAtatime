// src/api/auth.js
import { ENDPOINTS } from '../constant/api';
import api from './index';

export const loginUser = async (email_or_mobile, password, fcm_token) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, {
      email_or_mobile,
      password,
      fcm_token
    });
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const registerUser = async (mobile, password, confirm_password) => {
  try {
    const response = await api.post(ENDPOINTS.REGISTER, {
      mobile,
      password,
      confirm_password
    });
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const forgot_password = async (email_mobile, password, confirm_password) => {
  try {
    const response = await api.post(ENDPOINTS.FORGOT, {
      email_mobile,
      password,
      confirm_password
    });
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};


export const getPrivacyPolicy = async () => {
  try {
    const response = await api.get(ENDPOINTS.PRIVACY_POLICY);
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const registerUserWithEmail = async (email, password, confirm_password) => {
  try {
    const response = await api.post(ENDPOINTS.REGISTER, {
      email,
      password,
      confirm_password
    });
  
    return response.data;
  } catch (error) {
    console.log('Error registering user>>>>>>>>:', error);
    throw error;
  }
};




export const sendOtpEmail = async (email) => {
  try {
    const response = await api.post(ENDPOINTS.SEND_OTP, {
      email
    });
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};



export const sendOtp = async (mobile) => {
  try {
    const response = await api.post(ENDPOINTS.SEND_OTP, {
      mobile
    });
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const savePersonalDetails = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.SAVE_PERSONAL_DETAILS, 
      data
    );
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const getNotification = async () => {
  try {
    const response = await api.post(ENDPOINTS.Notificaiton);
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

export const clearNotificationAll = async () => {
  try {
    const response = await api.post(ENDPOINTS.ClearNotificaiton);
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};





// Add more auth functions as needed
