import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import { BaseColor, FontSupport, useTheme } from '../config/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have installed this library
import { scale } from 'react-native-size-matters'

const CustomEditTextNew = ({
  icon_name,
  style_view,
  placeholder,
  text_name,
  text_input,
  main_style,
  onTextChange,
  visibilityButton,
  buttonPress,
  isEditable,
  maxLength, 
  button_title,
  keyboardType,
  ref,
  secureTextEntry,
  input_style,
  text_style
}) => {

  const { colors } = useTheme();
  const [visibility, setVisibility] = useState(false);
  const [text, setText] = useState(text_input || ''); // Initialize with text_input or an empty string
  const [textVisible, setTextVisible] = useState(false);


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

  useEffect(() => {

    console.log(visibilityButton, 'visibilityButton')
    if (visibilityButton) {
      setVisibility(false);
    }
  }, [visibilityButton]);

  
  useEffect(() => {
    setText(text_input || ''); // Update the text state if text_input changes
  }, [text_input]);

  return (
    <View style={[styles.main, main_style]}>
      <Text style={[styles.text, { color: colors.text_color }, text_style]}>{text_name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={BaseColor.placeholder}
          style={[styles.input, {  color : colors.text_color, borderBottomColor: visibility ? BaseColor.greenColor : BaseColor.grayColor }, input_style]}
          text={text_input}
          value={text}
          editable={isEditable}
          maxLength={maxLength}
          keyboardType={keyboardType}
          fontSize={responsiveFontSize(1.8)}
          onChangeText={(text) => { handleTextChange(text) }}
          secureTextEntry={secureTextEntry}
        >
        </TextInput>
        {
          visibility && (
            <TouchableOpacity style={styles.iconWrapper}
             onPress={() => { setText(''), setVisibility(false) }}>
                <Icon name='clear' size={15} color={colors.image_color} />
            </TouchableOpacity>

          )
        }

        {visibilityButton && (

          <TouchableOpacity
          style={styles.buttonWrapper}
           onPress={buttonPress}>
          
              <Text style={{
                fontFamily: Fonts.semiBold, fontSize: responsiveFontSize(1.6), lineHeight: responsiveFontSize(2)
                , color: BaseColor.whiteColor
              }}>{button_title}</Text>
          </TouchableOpacity>

        )}


      </View>



    </View>
  )
}

export default CustomEditTextNew

const styles = StyleSheet.create({

  iconWrapper: {
    backgroundColor: BaseColor.grayColor,
    borderRadius: 20,
    position: 'absolute',
    alignItems: 'center',
    end: 0,
    padding: 2
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.semiBold, // Replace with Fonts.semiBold if you have custom fonts
    borderBottomWidth: responsiveHeight(0.2),
    paddingBottom: 3,
  
  },

  main: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2)
  },

  text: {
    fontSize: responsiveFontSize(1.9),
    lineHeight: responsiveFontSize(2.3),
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
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(0.5)
  },
})