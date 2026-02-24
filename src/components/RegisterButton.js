// components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { BaseColor } from '../config/theme';
import { Fonts } from '../config/styles/fonts';

const RegisterButton = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BaseColor.primary,
    borderRadius: 30,
    paddingHorizontal : responsiveWidth(5),
  },
  buttonText: {
    color: BaseColor.whiteColor,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.medium,
    paddingVertical: responsiveHeight(1.2),
  },
});

export default RegisterButton;
