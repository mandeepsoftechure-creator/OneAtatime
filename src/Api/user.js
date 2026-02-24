import { ENDPOINTS } from '../constant/api';
import api from './index';

export const getUser = async (userId) => {
  try {
    const response = await api.get(`${ENDPOINTS.GET_USER}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching user with id ${userId}:`, error);
    throw error;
  }
};


export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`${ENDPOINTS.GET_USER}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(`Error deleting user with id ${userId}:`, error);
    throw error;
  }
};



export const getDailyActivites = async () => {
  try {
    const response = await api.post(ENDPOINTS.DAILY_ACTIVITIES,
      {});

     
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};


export const checkSubscriptionStatus = async () => {
  try {
    const response = await api.get(ENDPOINTS.userSubscription);

    console.log(response.data)
    return response.data;


  } catch (error) {
    console.error('Error checking subscription status:', error);
    throw error;
  }
};

export const getAllPlans = async () => {
  try {
    const response = await api.post(ENDPOINTS.getAllPlans);
    

    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};



export const subscribeUser = async (plan_id) => {
  try {
    const response = await api.post(ENDPOINTS.subscribe, {
      plan_id: plan_id
    });
    return response.data;

    
  } catch (error) {
    console.log(`Subscription error:`, error);
    throw error;
  }
};

export const getActivites = async () => {
  try {
    const response = await api.post(ENDPOINTS.ACTIVITIES,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getFaqs = async () => {
  try {
    const response = await api.post(ENDPOINTS.FAQ,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getDailyNewActivites = async () => {
  try {
    const response = await api.post(ENDPOINTS.DAILYNew_ACTIVITIES,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getWeeklyActivites = async () => {
  try {
    const response = await api.post(ENDPOINTS.WEEKELY_ACTIVITIES,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getMonthlyActivites = async () => {
  try {
    const response = await api.post(ENDPOINTS.MONTHLY_ACTIVITIES,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.post(ENDPOINTS.PROFILE,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getPonderDetails = async () => {
  try {
    const response = await api.post(ENDPOINTS.PONDER,
      {});
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const getActivitesDetails = async (activity_id) => {
  try {
    const response = await api.post(ENDPOINTS.ACTIVITIES_DETAILS,
      { activity_id });
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const saveActivities = async (activity_id) => {
  try {
    const response = await api.post(ENDPOINTS.SAVE_ACTIVITIES,
      { activity_id });
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};

export const removeActivities = async (activity_id) => {
  try {
    const response = await api.post(ENDPOINTS.REMOVE_ACTIVITIES,
      { activity_id });
    return response.data;
  } catch (error) {
    console.log(`Error fetching:`, error);
    throw error;
  }
};


export const updateProfile = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.UPDATE_PROFILE,
      data
    );
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};



export const updateProfileImage = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.UPDATE_PROFILE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    );
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};

// Add more user functions as needed
