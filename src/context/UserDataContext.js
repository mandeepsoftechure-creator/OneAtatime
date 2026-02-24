// UserDataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserData, setUserData } from '../Data/asyncStorage';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserDataState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();
        setUserDataState(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveUserData = async (data) => {
    try {
      await setUserData(data);
      setUserDataState(data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, saveUserData, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
