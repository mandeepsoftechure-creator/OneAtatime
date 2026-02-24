import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Fonts } from '../config/styles/fonts'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { BaseColor } from '../config/theme'

const CustomEditTextHeight = ({ value, onChangeText, text, style, title, placeholder, input_text, maxLength , minLength }) => {


    // use this conde for only number 

    // const handleTextChange = (text) => {
    //     const numericValue = text.replace(/[^0-9]/g, '');
    //     onChangeText(numericValue);
    //   };
    

    console.log(value)
    return (
        <View style={style}>
            <Text
                style={{
                    fontSize: responsiveFontSize(1.9),
                    fontFamily: Fonts.semiBold,
                    lineHeight: responsiveFontSize(2.2),
                    color: BaseColor.black,
                    paddingHorizontal: responsiveHeight(0.5)
                }}>{title}</Text>
            <View style={styles.inlineInput}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="numeric"
                    placeholder={placeholder}
                    maxLength={maxLength}  
                    placeholderTextColor={BaseColor.placeholder}
                    fontSize={responsiveFontSize(1.8)}
                />
                <View style={{
                    borderRadius: 8, position: 'absolute', end: 0, bottom: 0, backgroundColor: BaseColor.primary,
                    alignItems: 'center', justifyContent: 'center', paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveHeight(1),
                }}>
                    <Text style={styles.unit}>{text}</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomEditTextHeight

const styles = StyleSheet.create({

    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.semiBold,
        color : BaseColor.black,
        flex: 1,
    },
    inlineInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unit: {
        fontSize: responsiveFontSize(2),
        lineHeight: responsiveFontSize(2.5),
        fontFamily: Fonts.semiBold,
        color: BaseColor.whiteColor,
        alignSelf: 'center',



    },
})