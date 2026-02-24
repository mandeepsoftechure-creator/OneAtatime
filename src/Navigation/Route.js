// In App.js in a new project

import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, HomeScreen, LoginWithMobile, Register, SplashScreen } from '../Screens';
import navigationString from '../constant/navigationString';
import StartScreen from '../Screens/StartScreen';
import LoginWithEmail from '../Screens/LoginWithEmail';
import Profile from '../Screens/Profile';
import ProfileData from '../Screens/ProfileData';
import Login from '../Screens/Login';
import ExploreDetails from '../Screens/ExploreDetails';
import General from '../Screens/General';
import History from '../Screens/History';
import HealthChallenges from '../Screens/HealthChallenges';
import Familyillnesses from '../Screens/Familyillnesses';
import PastDisease from '../Screens/PastDisease';
import Occupation from '../Screens/Occupation';
import Message from '../Screens/Message';
import NotificationScreen from '../Screens/NotificationScreen';
import ForgotPassword from '../Screens/ForgotPassword';
import PaymentScreen from '../Screens/PaymentScreen';


const Stack = createNativeStackNavigator();

function Route() {
  return (

    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown : false}} 
     initialRouteName ={navigationString.SplashScreen}>
    <Stack.Screen name={navigationString.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={navigationString.LoginWithMobile} component={LoginWithMobile} />
      <Stack.Screen name={navigationString.Register} component={Register} />
      <Stack.Screen name={navigationString.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={navigationString.StartScreen} component={StartScreen} />
      <Stack.Screen name={navigationString.LoginWithEmail} component={LoginWithEmail} />
      <Stack.Screen name={navigationString.Profile} component={Profile} />
      <Stack.Screen name={navigationString.ProfileData} component={ProfileData} />
      <Stack.Screen name={navigationString.Login} component={Login} />
      <Stack.Screen name={navigationString.ExploreDetails} component={ExploreDetails} />
      <Stack.Screen name={navigationString.General} component={General} />
      <Stack.Screen name={navigationString.History} component={History} />
      <Stack.Screen name={navigationString.HealthChallenges} component={HealthChallenges} />
      <Stack.Screen name={navigationString.Familyillnesses} component={Familyillnesses} />
      <Stack.Screen name={navigationString.PastDiesease} component={PastDisease} />
      <Stack.Screen name={navigationString.Occupation} component={Occupation} />
      <Stack.Screen name={navigationString.Message} component={Message} />
      <Stack.Screen name={navigationString.NotificationScreen} component={NotificationScreen} />
      <Stack.Screen name={navigationString.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={navigationString.PaymentScreen} component={PaymentScreen} />


    </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Route;