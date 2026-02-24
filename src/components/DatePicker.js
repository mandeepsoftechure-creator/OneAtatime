import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BaseColor } from '../config/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';

const DatePicker = ({ text_name, placeholder, onChangeText, main_style }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleConfirm = (date) => {
    const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setSelectedDate(formatted);
    onChangeText(formatted);
    setShow(false);
  };

  return (
    <View style={[styles.main, main_style]}>
      <Text style={[styles.text, { color: BaseColor.black }]}>{text_name}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)}>
        <View pointerEvents="none">
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={BaseColor.placeholder}
            style={styles.input}
            value={selectedDate}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={show}
        mode="date"
        display="spinner"
        presentationStyle="overFullScreen"
        maximumDate={new Date()}
        minimumDate={new Date(1940, 0, 1)}
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  main: { paddingHorizontal: responsiveWidth(1), paddingTop: responsiveHeight(2) },
  text: { fontSize: responsiveFontSize(1.9), fontFamily: Fonts.semiBold },
  input: {
    height: 40,
    fontSize: responsiveFontSize(1.8),
    borderBottomWidth: 1,
    borderColor: BaseColor.grayColor,
    color: BaseColor.black,
    fontFamily: Fonts.semiBold,
    paddingHorizontal: responsiveWidth(1),
  },
});

export default DatePicker;
