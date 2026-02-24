import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Assuming you're using AntDesign icons
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BaseColor } from '../config/theme';
import LinearGradient from 'react-native-linear-gradient';
import { BaseStyle } from '../config/styles/BaseStyle';

const ListItem = ({ text, status, onPress , backgroundColor}) => {
  return (

    //     <LinearGradient
    //     start={{x: 1, y: 1}} // top-left
    //     end={{x: 1, y: 1}} // bottom-right
    //  colors={[BaseColor.whiteColor, BaseColor.light, BaseColor.light]}
    //  style={{  
    //     marginHorizontal: responsiveWidth(2.5),

    //  }}
    //     >    

    <View style={[styles.itemContainer, {backgroundColor}]}>

      <Text style={styles.itemText}
        numberOfLines={1}
        ellipsizeMode='tail'>{text}</Text>
      <TouchableOpacity onPress={onPress}
      style={styles.icon}>
        <Icon
          name={status == true ? 'check' : 'plus'}
          size={15}
          color={status == true ? BaseColor.black : BaseColor.black}
        />
      </TouchableOpacity>

    </View>

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
    borderWidth : 1,
    borderColor : BaseColor.light,
    paddingHorizontal : responsiveWidth(3),
    paddingVertical : responsiveHeight(1.5),
    marginBottom : responsiveHeight(1)

  },
  itemText: {
    flex : 1,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.6),
    color: BaseColor.black,
    //width : responsiveWidth(75)

  },

  icon : {
    borderWidth: responsiveWidth(0.3),
    borderColor: BaseColor.light,
    paddingHorizontal : 8,
    paddingVertical : 8,
    borderRadius: 8,
 
  }
});

export default ListItem;
