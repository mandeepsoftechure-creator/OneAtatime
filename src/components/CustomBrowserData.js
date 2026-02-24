import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import { BaseColor } from '../config/theme'

const CustomBrowserData = ({lable_first, lable_second, color_first, color_second, marginTop, value_first, value_second}) => {
  return (
    <View style={[styles.container, {marginTop}]}>
          <View style={{flex : 1}}>
          <Text style={styles.label}>{lable_first}</Text>
          <Text style={[styles.successRate, {color : color_first}]}>{value_first}</Text>
          </View>
          <View style={{flex : 1}}>
          <Text style={styles.label}>{lable_second}</Text>
          <Text style={[styles.successRate, {color : color_second}]}>{value_second}</Text>
          </View>
          </View>
  )
}

export default CustomBrowserData

const styles = StyleSheet.create({

    container : {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        justifyContent: 'flex-start',
        flex: 1,
        
    },

    label: {
        fontSize: responsiveFontSize(1.4),
        lineHeight : responsiveFontSize(1.6),
        color : BaseColor.grayColor,
        fontFamily : Fonts.semiBold,
        letterSpacing : 1.5,

      },

      successRate: {
        fontSize: responsiveFontSize(2),
        fontFamily : Fonts.semiBold,
        lineHeight : responsiveFontSize(2.5),
        marginTop : responsiveHeight(0.7)

      },

})