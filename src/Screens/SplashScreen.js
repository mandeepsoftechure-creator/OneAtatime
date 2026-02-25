import { Animated, Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Images from '../assets/images/images'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Fonts } from '../config/styles/fonts';
import { BaseColor, useTheme } from '../config/theme';
import navigationString from '../constant/navigationString';
import { useUserData } from '../context/UserDataContext';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getUserData } from '../Data/asyncStorage';
import withNetworkCheck from '../Utils/withNetworkCheck';
const windowWidth = Dimensions.get('window').width;


const SplashScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const { userData, loading } = useUserData();
  const statusBarHeight = getStatusBarHeight();



  useEffect(() => {
    StatusBar.setBarStyle(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content');
    StatusBar.setBackgroundColor(colors.background);
  }, [colors]);


  useEffect(() => {
    startZoomIn();
  }, []);

  const startZoomIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await getUserData('access_token');
          if (token) {
            navigation.replace(navigationString.HomeScreen);
          } else {
            navigation.replace(navigationString.Login);
          }
        } catch (error) {
          console.log('Error checking login status:', error);
        }
      };
      checkLoginStatus();
    }, 5000);
  }, []);

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={[styles.container, {
        paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? 0 : statusBarHeight) : responsiveHeight(3.5),
        paddingBottom: responsiveHeight(2.5)
      }]}>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <View style={styles.imageContainer}>
            <Image source={Images.image_splash_logo}
              style={styles.image}
            />
          </View>
        </Animated.View>


        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>

          <Text style={styles.text1}>One at a Time</Text>

        <Text
          style={styles.text4}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.9}
        >
          Small Steps, Lasting Health!
        </Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <View style={{ marginBottom: responsiveHeight(2) }}>
            <Text style={styles.text2}>Dr.Deepak K. Tibrewal</Text>
            <Text style={styles.text3}>MBBS, MF(Hom.) London</Text>
            <Text style={styles.text5}>Copyright ©️ Dr Deepak K Tibrewal 2025</Text>

          </View>

        </Animated.View>


      </View>
    </SafeAreaView>
  )
}

export default withNetworkCheck(SplashScreen)

const styles = StyleSheet.create({

  container: {
    flex : 1,
    justifyContent : 'space-between',
    paddingVertical : responsiveHeight(5)
  },

  imageContainer: {
    height: responsiveHeight(50), 
    width: windowWidth , 
    alignItems: 'center',
    alignSelf : 'center',
    justifyContent: 'center',
  
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  text1: {
    color: BaseColor.primary, 
    fontFamily: Platform.OS === 'ios' ? Fonts.georgiaBold : 'georgia b',
   // fontWeight: 'bold',
    fontSize: responsiveFontSize(6.2), 
    
    textAlign : 'center',
    includeFontPadding : false,
    marginHorizontal:'2%'

  },

  text2: {
    color: BaseColor.charcol,
    fontFamily: Platform.OS === 'ios' ? Fonts.avenirSemiBold : Fonts.semiBold,
    fontSize: responsiveFontSize(3.15),
    includeFontPadding : false,
    alignSelf: 'center',

  },

  text3: {
    color: BaseColor.black,
    fontFamily: Fonts.avenirBold,
    fontSize: responsiveFontSize(2.15),
    includeFontPadding : false,
    alignSelf: 'center',
  },

    text5: {
    color: BaseColor.primary,
    fontFamily: Fonts.avenirItalic,
    marginTop : responsiveHeight(3),
    fontSize: responsiveFontSize(1.4),
    includeFontPadding : false,
    alignSelf: 'center',
  },

  text4: {
    color: BaseColor.plum,
    fontFamily: Fonts.italic,
    fontSize: responsiveFontSize(2.9),
    alignSelf: 'center',
    includeFontPadding : false,
    marginTop : responsiveHeight(0.5),
    marginHorizontal:'2%'
  },


})