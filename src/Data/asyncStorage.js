// UserDataStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString !== null) {
      return JSON.parse(userDataString);
    } else {
      console.log('No user data found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export const setUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
