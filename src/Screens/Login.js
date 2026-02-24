import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, BackHandler } from 'react-native'
import CustomHeaderLogin from '../components/CustomHeaderLogin';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import { BaseColor, useTheme } from '../config/theme';
import CustomEditText from '../components/CustomEditText';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import RegisterButton from '../components/RegisterButton';
import { Fonts } from '../config/styles/fonts';
import navigationString from '../constant/navigationString';
import Loader from '../components/Loader';
import { loginUser, registerUser, sendOtp } from '../Api/auth';
import CustomPassword from '../components/CustomPassword';
import Toast from 'react-native-simple-toast';
import { setUserData } from '../Data/asyncStorage';
import DatePicker from '../components/DatePicker';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from '../context/UserDataContext';
import withNetworkCheck from '../Utils/withNetworkCheck';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const Login = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const { userData, saveUserData } = useUserData();

    const [loading, setLoading] = useState(false);

    const [mobile, setMobile] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    //useStatusBar(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content', colors.background);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Exit From App',
                    'Do you want to exit from app?',
                    [
                        { text: 'Yes', onPress: () => BackHandler.exitApp() },
                        { text: 'No', style: 'cancel' },
                    ],
                    { cancelable: false }
                );
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove(); 
        }, [])
    );

    const handleBackPress = () => {
        navigation.goBack();
    };


    useEffect(() => {
        StatusBar.setBarStyle(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content');
        StatusBar.setBackgroundColor(colors.background);
    }, [colors]);


    const handleSubmit = async () => {

        if (!mobile) {
            Toast.show('Please enter mobile or email address', Toast.LONG);
        } else if (!password) {
            Toast.show('Password is required', Toast.LONG);
        } else
            try {
                setLoading(true);
                let token = await AsyncStorage.getItem('@fcm_device_token');

                if (token == null) {
                    const token_new = await messaging().getToken();
                    token = token_new;
                    // Save the new token to AsyncStorage for future use
                    await AsyncStorage.setItem('@fcm_device_token', token);
                }

                console.log(token, '===========================>')

                const response = await loginUser(mobile, password, token);

                if (response.status == true) {
                    saveUserData(response);
                    navigation.replace(navigationString.HomeScreen)
                    console.log('response:', response);
                } else {
                    Toast.show(response.message, Toast.LONG);
                }
            } catch (error) {
                console.log('Error response:', error);
            } finally {
                setLoading(false);
            }

    }

    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);
            await AsyncStorage.setItem('user-language', lng);
        } catch (error) {
            console.log('Failed to change language:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>

            <Loader visible={loading}></Loader>

            <CustomHeaderLogin title={t('Login')} onBackPress={handleBackPress} />

            <ScrollView style={{ backgroundColor: colors.app_background }} >

                <CustomEditText text_name={t('email_mobile')}
                    style_view={{ backgroundColor: BaseColor.light }}
                    placeholder={t('Enter...')}
                    onTextChange={(text) => { setMobile(text) }}
                />


                <CustomPassword text_name={t('password')}
                    style_view={{ backgroundColor: BaseColor.light }}
                    placeholder={t('Enter...')}
                    onTextChange={(text) => { setPassword(text) }}
                />

                <TouchableOpacity onPress={() => navigation.navigate(navigationString.ForgotPassword)}>
                    <Text style={styles.text_forgot}>{t('forgot_password')}</Text>
                </TouchableOpacity>

            </ScrollView>

            <View style={{
                position: 'absolute', bottom: responsiveHeight(0), left: responsiveWidth(0),
                right: responsiveWidth(0), marginBottom: responsiveHeight(2),
                marginHorizontal: responsiveWidth(2)
            }}>
                <TouchableOpacity onPress={() => navigation.navigate(navigationString.StartScreen)}>
                    <Text style={[styles.footerText]}>
                        {t('dont_have_account')}
                    </Text>
                </TouchableOpacity>

                <RegisterButton
                    title={t('Login')}
                    style={{ textAlign: 'center', marginHorizontal: responsiveWidth(3) }}
                    textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                    onPress={handleSubmit}
                />

            </View>
        </View>

    )
}

export default withNetworkCheck(Login);

const styles = StyleSheet.create({
    footerText: {
        fontSize: responsiveFontSize(1.7),
        color: BaseColor.primary,
        textAlign: 'center',
        marginBottom: responsiveHeight(1.8),
        fontFamily: Fonts.semiBold,
    },

    text_forgot: {
        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(1.9),
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2.5)
    }
})

{/* <View style={styles.languageButtons}>
          <TouchableOpacity onPress={() => changeLanguage('en')}>
            <Text style={styles.languageButton}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage('hi')}>
            <Text style={styles.languageButton}>हिन्दी</Text>
          </TouchableOpacity>
        </View> */}


