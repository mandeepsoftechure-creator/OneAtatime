import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BaseColor } from '../config/theme';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Fonts } from '../config/styles/fonts';

const statusBarHeight = getStatusBarHeight();

const CustomToast = ({ message, visible, status }) => {
  const [show, setShow] = useState(visible);
  const slideAnim = useState(new Animated.Value(-100))[0];

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400, // Adjust duration as needed
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          hideToast();
        }, 1000); // Toast display duration (adjust as needed)
      });
    }
  }, [visible, slideAnim]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 100, // Adjust duration as needed
      useNativeDriver: true,
    }).start(() => setShow(false));
  };

  const renderToast = () => {
    if (!show) return null;

    return (
      <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }, {paddingTop : Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? statusBarHeight + responsiveHeight(1) : statusBarHeight + responsiveHeight(0.5)) : responsiveHeight(1),
        backgroundColor : status ? BaseColor.greenColor : BaseColor.red
      }]}>
        <StatusBar backgroundColor={status ? BaseColor.greenColor : BaseColor.red} />
        <View style={styles.toast}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    );
  };

  return renderToast();
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    zIndex: 1000,
    elevation: 1000, // Ensure toast displays above other components

 
  },
  toast: {
    backgroundColor: BaseColor.blackColor,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 8,
  },
  message: {
        color: BaseColor.whiteColor,
        fontSize: responsiveFontSize(2),
        lineHeight : responsiveFontSize(2.5),
        fontFamily: Fonts.semiBold,
  },
});

export default CustomToast;


