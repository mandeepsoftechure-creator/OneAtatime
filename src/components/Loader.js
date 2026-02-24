import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarIndicator } from 'react-native-indicators'; // Import the BallIndicator component
import { BaseColor } from '../config/theme';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Loader = ({ visible }) => {
  if (!visible) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <BarIndicator color={BaseColor.yellowColor} 
      count={5}
      size={responsiveFontSize(6)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    zIndex: 9999,
  },
});

export default Loader;
