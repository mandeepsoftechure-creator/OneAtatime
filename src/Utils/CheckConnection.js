import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const CheckConnection = () => {
  const [netInfo, setNetInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state.isConnected);
    });

    // Fetch the current state once initially
    NetInfo.fetch().then((state) => {
      setNetInfo(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return netInfo;
};

export default CheckConnection;




