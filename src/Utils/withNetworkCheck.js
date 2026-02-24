// hoc/withNetworkCheck.js
import React from 'react';
import CheckConnection from './CheckConnection';
import { ErrorCard } from '../components/ErrorCard';


const withNetworkCheck = (WrappedComponent) => {
  return (props) => {
    const networkAvailable = CheckConnection(); // Use the custom hook

    if (networkAvailable === null) {
      // While the network status is being determined, you can return null or a loading indicator
      return null; // Or you can add a LoadingComponent if needed
    }

    if (!networkAvailable) {
      return <ErrorCard />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withNetworkCheck;
