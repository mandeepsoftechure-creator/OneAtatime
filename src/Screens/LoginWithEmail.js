import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import CustomHeaderLogin from '../components/CustomHeaderLogin';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import { BaseColor, useTheme } from '../config/theme';
import CustomEditText from '../components/CustomEditText';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import RegisterButton from '../components/RegisterButton';
import { Fonts } from '../config/styles/fonts';
import navigationString from '../constant/navigationString';
import Loader from '../components/Loader';
import { registerUser, registerUserWithEmail, sendOtp, sendOtpEmail } from '../Api/auth';
import CustomPassword from '../components/CustomPassword';
import Toast from 'react-native-simple-toast';
import withNetworkCheck from '../Utils/withNetworkCheck';

const LoginWithMobile = ({ navigation }) => {

  const { t } = useTranslation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);

 
  const [buttonSend, setButtonSend] = useState(false);
  const [buttonOtp, setButtonOtp] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [otp, setOtp] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const [isEmailEditable, setIsEmailEditable] = useState(true);
  const [isOtpEditable, setIsOtpEditable] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState();

  const [otpVerify, setOtpVerify] = useState(false);
  const [finalValue, setFinalValue] = useState(true);


 //  useStatusBar('dark-content', colors.background);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendOtp = async () => {
    if (!email) {
      Toast.show('Please enter a valid email address', Toast.LONG);
      return;
    }
    
    try {
      setLoading(true);
      const response = await sendOtpEmail(email);

      if (response.status == true) {
        setButtonSend(false)
        setIsEmailEditable(false)
        setVerifyOtp(response.otp)
        console.log('OTP Sent:', response.message);

      } else {
        console.log('OTP Sent:', response.message);
      }
    } catch (error) {

      console.log('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      Toast.show('Please enter a valid otp', Toast.LONG);
      return;
    } else if (verifyOtp != otp) {
      Toast.show('Invalid OTP. Please try again.', Toast.LONG);
      return;
    }

    try {
      setLoading(true);
      const response = await sendOtpEmail(email);

      if (response.status == true) {
        setButtonOtp(false)
        setIsOtpEditable(false)
        setOtpVerify(true)
        console.log('OTP Sent:', response.message);

      } else {
        console.log('OTP Sent:', response.message);
      }
    } catch (error) {

      console.log('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {

    if (!email) {
      Toast.show('Email is required', Toast.LONG);
    } else if (!verifyOtp) {
      Toast.show('Send otp in email', Toast.LONG);

    } else if(!otpVerify) {
      Toast.show('Please verfiy otp', Toast.LONG);
  } else if (!otp) {
    Toast.show('OTP is required', Toast.LONG);
  } else if (!password) {
    Toast.show('Password is required', Toast.LONG);
  } else if (password.length < 8) {
    Toast.show('Password must be at least 8 characters long', Toast.LONG);
  } else if (!confirmPassword) {
    Toast.show('Confirm Password is required', Toast.LONG);
  } else if (password !== confirmPassword) {
    Toast.show('Passwords do not match', Toast.LONG);
  }else
    try {
      console.log(email)
      setLoading(true);
      const response = await registerUserWithEmail(email, password, confirmPassword);

      // console.log('response', response);
      

      if (response.status == true) {
    
        navigation.replace(navigationString.ProfileData, { personal_details: response.personal_details, email, mobile : "" })
        console.log('response:', response.personal_details);

      } else {
        setButtonSend(false);
        setButtonOtp(false);
        setEmail(undefined);
        setOtp(undefined);
        setVerifyOtp(undefined);
        setPassword(undefined);
        setConfirmPassword(undefined);
        setIsEmailEditable(true);
        setIsOtpEditable(true);
        setOtpVerify(false);
        Toast.show(response.message, Toast.LONG);
      }
    } catch (error) {

      console.log('Error response:', error);
    } finally {
      setLoading(false);
    }

  }

  const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailPattern.test(email) && finalValue){
   setButtonSend(true)
   setFinalValue(false)
  }else {
    setButtonSend(false) 
    setFinalValue(true)
  }
};


  return (

  

     <View style={{ flex: 1, backgroundColor: colors.app_background }}> 

  

      <Loader visible={loading}></Loader>

      <CustomHeaderLogin icon_name='left' title="Register with Email" onBackPress={handleBackPress} />

        <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: colors.app_background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(2) : 0}
    >

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" >

     
      <CustomEditText text_name={'Email'}
                style_view={{ backgroundColor: BaseColor.light }}
                placeholder={'Enter...'}
                button_title={'Send OTP'}
                isEditable={isEmailEditable}
                buttonPress={handleSendOtp}
                onTextChange={(text) => { setEmail(text), validateEmail(text)}}
                visibilityButton={buttonSend}
                text_input={email}


            />


        <CustomEditText text_name={'OTP'}
          style_view={{ backgroundColor: BaseColor.light }}
          placeholder={'Enter...'}
          visibilityButton={buttonOtp}
          onTextChange={(text) => { setOtp(text), text.length >= 4 ? setButtonOtp(true) : setButtonOtp(false) }}
          buttonPress={handleVerifyOtp}
          isEditable={isOtpEditable}
          maxLength={4}
          button_title={'Verify OTP'}
          secureTextEntry={true}
          text_input={otp}
        />

        {otpVerify && (

          <View>
            <CustomPassword text_name={'Password'}
              style_view={{ backgroundColor: BaseColor.light }}
              placeholder={'Enter...'}
              onTextChange={(text) => { setPassword(text) }}
            />

            <CustomPassword text_name={'Confirm Password'}
              style_view={{ backgroundColor: BaseColor.light }}
              placeholder={'Enter...'}
              onTextChange={(text) => { setConfirmPassword(text) }}
            />
          </View>
        )}



        </ScrollView>

 
        </KeyboardAvoidingView>

             <View style={{
        position: 'absolute', bottom: responsiveHeight(0), left: responsiveWidth(0),
        right: responsiveWidth(0), marginBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(2)
      }}>

        {/* <Text style={[styles.footerText]}>
          Don't have account? Let's create!
        </Text> */}
        <RegisterButton
          title="Next"
          style={{ textAlign: 'center', marginHorizontal: responsiveWidth(3) }}
          textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
          onPress={handleSubmit}
        />

      </View>
     </View> 


  )
}

export default withNetworkCheck(LoginWithMobile);

const styles = StyleSheet.create({
  footerText: {
    fontSize: responsiveFontSize(1.4),
    color: BaseColor.primary,
    textAlign: 'center',
    marginBottom: responsiveHeight(1.8),
    fontFamily: Fonts.semiBold,

  },
})