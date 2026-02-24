import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Assuming you're using AntDesign icons
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BaseColor, useTheme } from '../config/theme';
import LinearGradient from 'react-native-linear-gradient';

const ListItemExplore = ({ text , onPress, backgroundColor}) => {

  const {colors} = useTheme();
  return (

//     <LinearGradient
//     start={{x: 1, y: 1}} // top-left
//     end={{x: 1, y: 1}} // bottom-right
//  colors={[BaseColor.whiteColor, BaseColor.light, BaseColor.light]}
//  style={{  
//     marginHorizontal: responsiveWidth(2.5),

//  }}
//     >    
  
    <TouchableOpacity onPress={onPress}>

    <View style={[styles.itemContainer, {backgroundColor}]}>

      <Text style={styles.itemText}
      numberOfLines={1}
      ellipsizeMode='tail'>{text}</Text>
   
      <Icon
        name='right'
        size={18}
        color={BaseColor.black}
      />

    </View>
    </TouchableOpacity>


    // </LinearGradient>


  );
};

const styles = StyleSheet.create({
   

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 0,
    borderWidth: 1,
    borderColor: BaseColor.light,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2.3),
    marginBottom: responsiveHeight(1)
  },
  itemText: {
    flex : 1,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.6),
    color: BaseColor.black,
  },
});

export default ListItemExplore;
