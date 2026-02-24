
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Dimensions, Linking, Platform, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'; // Example for using vector icons
import Images from '../assets/images/images';
import { Fonts } from '../config/styles/fonts';
import { BaseColor, useTheme } from '../config/theme';
import RegisterButton from '../components/RegisterButton';
import navigationString from '../constant/navigationString';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Loader from '../components/Loader';
import { getPrivacyPolicy } from '../Api/auth';
import { useToast } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
import withNetworkCheck from '../Utils/withNetworkCheck';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import { BaseStyle } from '../config/styles/BaseStyle';

const windowWidth = Dimensions.get('window').width;

const StartScreen = ({navigation}) => {

  const showToast = useToast();
  const { t } = useTranslation();

  const {colors} = useTheme();
  // useStatusBar(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content', colors.background);
  const [loading, setLoading] = useState(false);
  const statusBarHeight = getStatusBarHeight();
  const [privacyPolicy, setPrivacyPolicy] = useState('');


  const openWeb = () => {
    if(!privacyPolicy){
      showToast(t('privacy_policy_url_not_found'), false);
    }else{
      Linking.openURL(privacyPolicy).catch(err => console.log('Failed to open page:', err));

    }
  };


  useEffect ( ()=> {
      const handleGetPrivacyPolicy = async () => {
        setLoading(true);
        try {
          const data = await getPrivacyPolicy();

          console.log(data)
          
          const privacyLink = data?.data?.['privacy-link'];
          if (privacyLink) {
            setPrivacyPolicy(privacyLink);
          } else {
            throw new Error('Privacy link not found');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch privacy policy');
        } finally {
          setLoading(false);
        }
      };
    
      handleGetPrivacyPolicy();
    
      },[]);

      useEffect(() => {
        StatusBar.setBarStyle(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content');
        StatusBar.setBackgroundColor(colors.background);
      }, [colors]);
      

  return (

    <SafeAreaView style={[BaseStyle.safeAreaView, 
      {backgroundColor : colors.background,  }
    ]}>

    <View style={{flex : 1, backgroundColor : colors.background}} edges={['right', 'top', 'left', 'bottom']}>
      {/* <StatusBar hidden ={false}></StatusBar> */}
      <Loader visible={loading}></Loader>

      <TouchableOpacity
        style={{
         // position: 'absolute',
          top: Platform.OS === 'ios' ?  10  : 10,
          left: 15,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="left" size={22} color={colors.text_color} />
      </TouchableOpacity>
      <View style={{ flex : 1, justifyContent : 'space-between', paddingVertical : responsiveHeight(4)}}>


        <View style={styles.imageContainer}>
          <Image
            source={Images.loginback} // Replace with your actual image path
            style={[styles.image, {tintColor : colors.text_color}]}
          />
        </View>
        <View> 
          <Text style={styles.title}>{t('lets_begin')}</Text>
          <View style={{flexDirection : 'row', marginHorizontal : responsiveWidth(2)}}>
            <RegisterButton 
              style={{flex : 1, alignItems : 'center', marginHorizontal : responsiveWidth(2)}}
              title={t('register_with_mobile')} 
              onPress={() => navigation.navigate(navigationString.LoginWithMobile)} 
            />
            <RegisterButton 
              style={{flex : 1, alignItems : 'center', marginHorizontal : responsiveWidth(2)}}
              title={t('register_with_email')} 
              onPress={() => navigation.navigate(navigationString.LoginWithEmail)} 
            />
          </View>
          <View style={{flexDirection : 'row', alignSelf : 'center'}}>
            <Text style={[styles.footerText]}>{t('by_continuing_you_agree')}</Text>
            <TouchableOpacity onPress={openWeb}>
              <Text style={[styles.footerText]}>
                <Text style={styles.linkText}> {t('terms_of_services')}</Text> &amp;
                <Text style={styles.linkText}> {t('privacy_policy')}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: responsiveHeight(40), // Adjust based on your design
    width: windowWidth * 0.8, // 80% of screen width
    alignItems: 'center',
    alignSelf : 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure the image is clipped to the container bounds
    marginTop : responsiveHeight(2)
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the container and maintains its aspect ratio
  },
  title: {
    textAlign : 'center',
    color: BaseColor.yellowColor, // Adjust to match your design color
    fontSize: responsiveFontSize(5),
    fontFamily : Fonts.medium,
    marginVertical: responsiveHeight(2),
  },
  buttonText: {
    color: BaseColor.whiteColor,
    fontSize: responsiveFontSize(1.7),
    fontFamily: Fonts.medium,
  },
  linkButton: {
    marginVertical: responsiveHeight(2),
  },
  linkButtonText: {
    color: BaseColor.primary,
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
  footerText: {
    fontSize: responsiveFontSize(1.4),
    color: BaseColor.primary,
    textAlign: 'center',
    marginTop: responsiveHeight(1.3),
    fontFamily : Fonts.bold
  },
  linkText: {
    color: BaseColor.primary,
    textDecorationLine: 'underline',
  },
});

export default withNetworkCheck(StartScreen);

