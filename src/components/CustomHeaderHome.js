import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Fonts } from '../config/styles/fonts'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/AntDesign';
import IconNew from 'react-native-vector-icons/Ionicons';// Ensure you have installed this library
import { BaseColor, useTheme } from '../config/theme';
import navigationString from '../constant/navigationString';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../context/NotificationContext';

const CustomHeaderHome = ({ header_text_name, navigation, borderBottomWidth }) => {

    const {colors} = useTheme();
    const statusBarHeight = getStatusBarHeight();
    const { unreadCount, resetUnreadCount } = useContext(NotificationContext);

   //const [unreadCount, setUnreadCount] = useState(0);
    // Load notification count from AsyncStorage when the component mounts


    // const loadNotificationCount = async () => {
    //     const count = await AsyncStorage.getItem('@notification_count');
    //     if (count) {
    //         setUnreadCount(parseInt(count));
    //     }
    // };

    // messaging()
    // .getInitialNotification()
    // .then(remoteMessage => {
    //     if (remoteMessage) {
    //         console.log('App was opened by notification:', remoteMessage);
    //         loadNotificationCount();
    //     }
    // });

    // useEffect(() => {
       
    //     loadNotificationCount();

       
    //     // Check whether the app was opened from a notification (when the app is terminated)
      
    
    // }, [unreadCount]);

  
    // Function to handle resetting the notification count
    // const resetUnreadCount = async () => {
    //     await AsyncStorage.setItem('@notification_count', '0');
    //     setUnreadCount(0);
    // };
   
    return (
        <SafeAreaView style={{backgroundColor : colors.background}}>

            <View style={[styles.container, { borderBottomWidth: borderBottomWidth === 1 ? 0 : 0.8 }, 
             {
                paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? responsiveHeight(1) : statusBarHeight) : responsiveHeight(2),
                paddingBottom: responsiveHeight(2.5)
              }
                ]}>

                <Text style={[styles.text, { color: colors.primary_new}]}>{header_text_name}</Text>
                {/* <TouchableOpacity>
                    <Icon style={styles.icon} name='search1' size={20} color={BaseColor.primary} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => { resetUnreadCount(), notifee.cancelAllNotifications(), navigation.navigate(navigationString.NotificationScreen) }}>
                   {unreadCount > 0 && <View style={styles.redDot} />}
                    <IconNew style={styles.icon} name='notifications-outline' size={20} color={BaseColor.primary} />
                  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(navigationString.Profile)}>
                    <Icon name='menu-unfold' size={20} color={BaseColor.primary} />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

export default CustomHeaderHome

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        paddingBottom: responsiveHeight(2.5),
        borderBottomColor: BaseColor.light,
        

    },

    icon: {

        marginEnd: responsiveWidth(4)
    },

    text: {

        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(2.5),
        lineHeight: responsiveFontSize(2.9),
        includeFontPadding : false,
        letterSpacing: -1,
        justifyContent: 'flex-start',
     //   marginTop: responsiveHeight(1),
        flex: 1,


    },

    redDot: {
        position: 'absolute',
        top: -4,
        width: 10,
        left : 12,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
      },
})