import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'; 
import { BaseColor } from '../config/theme';

const CustomArrowIcon = ({backgroundColor , elevation, marginEnd, icon}) => {
  return (
    <View style={{ padding : 8, borderRadius : 15, alignSelf : 'baseline', elevation, backgroundColor, marginEnd}}>
       <Icon
        name={icon}
        size={25}
        color={BaseColor.black}
      />
    </View>
  )
}

export default CustomArrowIcon

const styles = StyleSheet.create({})