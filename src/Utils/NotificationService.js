import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationService {
  // Request permission for notifications
  static async requestUserPermission() {
    try {
      if (Platform.OS === 'android') {
        // Check for Android 13+ specific notification permission
        if (Platform.Version >= 31) {
          const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          if (result === RESULTS.GRANTED) {
            console.log('Android 13+ notification permission granted');
          } else {
            console.log('Android 13+ notification permission denied');
            return;
          }
        }
      }
        
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission', error);
    }
  }

  // Get the device token for Firebase messaging
  static async getDeviceToken() {
    try {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('@fcm_device_token', token);
      console.log('FCM Device Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  }

  // Handle background notifications (when the app is in the background or terminated)
  static setBackgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      await NotificationService.displayNotification(remoteMessage);
    });
  }

  // Handle foreground notifications (when the app is in the foreground)
  static setForegroundMessageHandler() {
    messaging().onMessage(async remoteMessage => {
      console.log('Message received in the foreground!', remoteMessage);
     // await this.incrementBadgeCount();
      try {
        // Get the current notification count from AsyncStorage
        const count = await AsyncStorage.getItem('@notification_count');
        const newCount = count ? parseInt(count) + 1 : 1; // Increment the count or set it to 1 if it's the first notification
        
        // Store the new count in AsyncStorage
        await AsyncStorage.setItem('@notification_count', newCount.toString());
        console.log('Updated notification count:', newCount);
      } catch (error) {
        console.error('Error updating notification count', error);
      }
      await NotificationService.displayNotification(remoteMessage);
    });
  }

  static async setBadgeCount(count) {
    try {
      await notifee.setBadgeCount(count);
      console.log(`Badge count set to: ${count}`);
    } catch (error) {
      console.error('Error setting badge count:', error);
    }
  }


  static async incrementBadgeCount() {
    try {
      const currentCount = (await notifee.getBadgeCount()) || 0;
      const newCount = currentCount + 1;
      await this.setBadgeCount(newCount);
    } catch (error) {
      console.error('Error incrementing badge count:', error);
    }
  }

  // Reset badge count
  static async resetBadgeCount() {
    try {
      await this.setBadgeCount(0);
      console.log('Badge count reset');
    } catch (error) {
      console.error('Error resetting badge count:', error);
    }
  }

  static initializeBadgeReset() {
    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        console.log('App is active, resetting badge count...');
       // await this.resetBadgeCount();
      }
    });
  }

  // Handle notification opened (when the app is opened via a notification click)
  static setNotificationOpenedHandler() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:', remoteMessage);
      //this.resetBadgeCount();
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
        //this.resetBadgeCount();
      }
    });
  }

  // Display a notification using Notifee
  static async displayNotification(remoteMessage) {
    try {
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: 4, // 4 is equivalent to HIGH priority
      });
      const imageUrl = remoteMessage.data?.imageUrl
      // Display the notification
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
         // smallIcon: 'ic_launcher',
          sound: 'default',
          smallIcon: 'ic_launcher',
         // color: '#00aaff',
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }
}

export default NotificationService;



