import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'; // Assuming you're using AntDesign icons
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BaseColor, useTheme } from '../config/theme';
import LinearGradient from 'react-native-linear-gradient';

const ListItemGoal = ({ text, done, total, backgroundColor  }) => {
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

    <View style={[styles.itemContainer, {backgroundColor}]}>

      <Text style={styles.itemText}
        numberOfLines={1}
        ellipsizeMode='tail'>{text}</Text>
      <TouchableOpacity style={{
        borderWidth: responsiveWidth(0.2), 
        borderColor: BaseColor.light,
        borderRadius: 10,
        padding : 8
      }}>

        <Text style={{
          fontFamily: Fonts.semiBold,
          fontSize: responsiveFontSize(1.5),
          lineHeight: responsiveFontSize(2),
          color: BaseColor.black,
        }}>{done}/{total}</Text>
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
    borderWidth: 1,
    borderColor: BaseColor.light,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
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

export default ListItemGoal;
