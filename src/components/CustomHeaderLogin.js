// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign'; // Ensure you have installed this library
// import { BaseColor, useTheme } from '../config/theme';
// import { Fonts } from '../config/styles/fonts';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// //import { SafeAreaView } from 'react-native-safe-area-context';

// const CustomHeaderLogin = ({ title, onBackPress, icon_name}) => {

//   const {colors} = useTheme();
//   const statusBarHeight = getStatusBarHeight();

//   return (
//     <SafeAreaView style={[styles.headerContainer,  { paddingTop: Platform.OS === 'ios' ? 0 : 
//      responsiveHeight(3.5) }]}>
//       <TouchableOpacity onPress={onBackPress}>
//         <Icon name={icon_name} size={22} color={colors.image_color}/>
//       </TouchableOpacity>
//       <Text style={[styles.title, {color : colors.text_color}]}>{title}</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: responsiveWidth(5),
//     paddingBottom: responsiveHeight(2.5),
//     backgroundColor: BaseColor.whiteColor,
//     borderBottomWidth: 0.8,
//     borderBottomColor: BaseColor.light,

//   },
 
//   title: {
//     fontSize: responsiveFontSize(2.5),
//     lineHeight : responsiveFontSize(3.5),
//     fontFamily: Fonts.semiBold,
//     paddingStart : responsiveWidth(2)
//   //  marginTop : responsiveHeight(0.5)

  
//   },
// });

// export default CustomHeaderLogin;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Ensure you have installed this library
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import { BaseColor, useTheme } from '../config/theme';
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const CustomHeaderLogin = ({ title, onBackPress, icon_name, clear , notificaiton}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const statusBarHeight = getStatusBarHeight();




  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View style={[
        styles.headerContainer,
        {
          paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? responsiveHeight(1) : statusBarHeight) : responsiveHeight(2),
          paddingBottom: responsiveHeight(2.5)
        }
      ]}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon name={icon_name} size={20} color={colors.image_color} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text_color }]}>{title}</Text>
       {notificaiton && <TouchableOpacity onPress={clear} style={styles.button}>
        <MaterialIcons name="delete" size={24} color={BaseColor.primary} />
      </TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
   // backgroundColor: BaseColor.whiteColor,
    borderBottomWidth: 0.8,
    borderBottomColor: BaseColor.light,
  },
  title: {
    flex : 1,
    fontSize: responsiveFontSize(2.5),
    fontFamily: Fonts.semiBold,
    paddingStart: responsiveWidth(2.5),
    includeFontPadding : false

  },
});

export default CustomHeaderLogin;



