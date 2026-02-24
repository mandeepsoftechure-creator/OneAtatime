/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';
import './src/i18n/i18nconfig.js'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!2222', remoteMessage);
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
    });
    
    

AppRegistry.registerComponent(appName, () => App);
