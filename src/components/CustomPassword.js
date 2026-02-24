import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import { BaseColor, FontSupport, useTheme } from '../config/theme'
import Icon from 'react-native-vector-icons/Entypo'; // Ensure you have installed this library
import { scale } from 'react-native-size-matters'

const CustomPassword = ({
  placeholder,
  text_name,
  text_input,
  main_style,
  onTextChange,
  isEditable,
  maxLength, 
}) => {

  const { colors } = useTheme();

  const [visibility, setVisibility] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [text, setText] = useState(undefined);

  const handleTextChange = (text) => {
    setText(text);
    onTextChange(text)
    // { text.length > 0 ? setVisibility(true) : setVisibility(false) }
    if (text.length > 0) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  
  return (
    <View style={[styles.main, main_style]}>
      <Text style={[styles.text, { color: colors.text_color }]}>{text_name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, {color: colors.text_color, borderBottomColor: visibility ? BaseColor.greenColor : BaseColor.grayColor }]}
          text={text_input}
          value={text}
          editable={isEditable}
          fontSize={responsiveFontSize(1.9)}
          maxLength={maxLength}
          onChangeText={(text) => { handleTextChange(text) }}
          secureTextEntry={!textVisible}
        >
        </TextInput>
        
            <TouchableOpacity 
            style={ styles.iconWrapper}
            onPress={() => { setTextVisible(!textVisible) }}>
                <Icon name={textVisible ? 'eye' : 'eye-with-line'} size={22} color={colors.image_color} />
            </TouchableOpacity>


      </View>

    </View>
  )
}

export default CustomPassword

const styles = StyleSheet.create({

  iconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    end: 0,
    paddingEnd: 10,
    paddingTop : 10
  },

  input: {
    flex: 1,
    height: 60,
    fontSize: responsiveFontSize(1.9),
    fontFamily: Fonts.semiBold, // Replace with Fonts.semiBold if you have custom fonts
    borderBottomWidth: responsiveHeight(0.2),
    paddingBottom: 3,
  },

  main: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2)
  },

  text: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.4),
    fontFamily: Fonts.semiBold,
    letterSpacing: 0.8
  },

  view: {
    height: responsiveHeight(0.2)

  },

  buttonWrapper: {
    backgroundColor: BaseColor.primary,
    borderRadius: 12,
    position: 'absolute',
    end: 0,
    bottom: -30,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(0.5)
  },
})