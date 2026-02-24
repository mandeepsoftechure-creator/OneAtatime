import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Load the notification count from AsyncStorage
        const loadNotificationCount = async () => {
            const count = await AsyncStorage.getItem('@notification_count');
            setUnreadCount(count ? parseInt(count, 10) : 0);
        };

        // Increment the notification count
        const incrementNotificationCount = async () => {
            try {
                const currentCount = await AsyncStorage.getItem('@notification_count');
                const newCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
                await AsyncStorage.setItem('@notification_count', newCount.toString());
                setUnreadCount(newCount);
            } catch (error) {
                console.error('Error updating notification count', error);
            }
        };

        // Set up listeners for notifications
        const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
            console.log('Foreground notification received:', remoteMessage);
            incrementNotificationCount();
        });

        const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('Notification opened from background state:', remoteMessage);
            incrementNotificationCount();
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log('Notification opened app from quit state:', remoteMessage);
                    incrementNotificationCount();
                }
            });

        // Load initial count and set up listeners
        loadNotificationCount();

        return () => {
            // Clean up listeners
            unsubscribeOnMessage();
            unsubscribeOnNotificationOpenedApp();
        };
    }, []);

    const resetUnreadCount = async () => {
        try {
            await AsyncStorage.setItem('@notification_count', '0');
            setUnreadCount(0);
        } catch (error) {
            console.error('Error resetting notification count', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ unreadCount, resetUnreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};
