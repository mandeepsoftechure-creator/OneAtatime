import * as React from 'react';
import { View, Text } from 'react-native';
import Route from './src/Navigation/Route';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ToastProvider } from './src/context/ToastContext';
import { UserDataProvider } from './src/context/UserDataContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NotificationService from './src/Utils/NotificationService';
import { NotificationProvider } from './src/context/NotificationContext';
import { BaseColor } from './src/config/theme';

function App() {
  const [bootOk, setBootOk] = React.useState(true);

  React.useEffect(() => {
    try {
      // Comment or guard notification calls if they throw
      NotificationService.requestUserPermission?.();
      NotificationService.setBackgroundMessageHandler?.();
      NotificationService.setForegroundMessageHandler?.();
      NotificationService.setNotificationOpenedHandler?.();
      NotificationService.getDeviceToken?.();
      NotificationService.resetBadgeCount?.();
      NotificationService.initializeBadgeReset?.();
      console.log('NotificationService initialized');
    } catch (e) {
      console.error('Startup error:', e);
      setBootOk(false);
    }
    return () => {};
  }, []);

  if (!bootOk) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: BaseColor?.whiteColor || '#fff'}}>
            <View>
              <Text>App failed to start — check logs (npx react-native log-android / adb logcat)</Text>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <UserDataProvider>
          <NotificationProvider>
            <SafeAreaProvider>
              <SafeAreaView style={{flex : 1, backgroundColor : BaseColor.whiteColor}}>
                <Route />
              </SafeAreaView>
            </SafeAreaProvider>
          </NotificationProvider>
        </UserDataProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

export default App;


