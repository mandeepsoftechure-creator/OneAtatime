import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Alert, Animated, BackHandler, Image, PanResponder, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ListActivity from '../BottomTab/ListActivity';
import Goals from '../BottomTab/Goals';
import Explore from '../BottomTab/Explore';
import Browser from '../BottomTab/Browser';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import { BaseColor } from '../config/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import withNetworkCheck from '../Utils/withNetworkCheck';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '../config/styles/fonts';
import FAQ from '../BottomTab/FAQ';
import Images from '../assets/images/images';
import Ponder from '../BottomTab/Ponder';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { checkSubscriptionStatus, getAllPlans, subscribeUser } from '../Api/user';
import { useToast } from '../context/ToastContext';
import navigationString from '../constant/navigationString';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const showToast = useToast();

  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false); 
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Check subscription status function
  const checkUserSubscription = async () => {
    try {
      setSubscriptionLoading(true);
      const subscriptionData = await checkSubscriptionStatus();
      
      console.log('Subscription API Response:>>>>>>>', subscriptionData);
      
      if (subscriptionData && subscriptionData.current_subscription) {
        const status = subscriptionData.current_subscription.status;
        
        // Show popup for status 0 (no subscription) or 2 (expired/needs upgrade)
        if (status === 0 || status === 2) {
          const plansData = await getAllPlans();

          console.log('Plans Data:', plansData);
          


          if (plansData && plansData.status && plansData.plans) {
            setSubscriptionPlans(plansData.plans);
            setShowSubscriptionPopup(true);
          }
        } else if (status === 1) {
          // Active subscription - hide popup if it's open
          setShowSubscriptionPopup(false);
          console.log('User has active subscription');
        }
      }else if(subscriptionData && subscriptionData.is_free_trial_available){
          const plansData = await getAllPlans();

          console.log('Plans Data>>>>>>>:', plansData);
          setSubscriptionPlans(plansData.plans);
         setShowSubscriptionPopup(true);
      }
    } catch (error) {
      console.error('Error in subscription check:', error);
      Alert.alert('Error', 'Failed to check subscription');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Check subscription on component mount
  useEffect(() => {
    checkUserSubscription();
  }, []);

  // Check subscription when screen comes into focus (e.g., returning from payment screen)
  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen focused - checking subscription status');
      checkUserSubscription();
    }, [])
  );

  const handleSubscriptionSelect = async (selectedPlan) => {
    console.log('Selected subscription:', selectedPlan);
    setIsSubscribing(true);
    
    try {
      let planId;
      
      // Map the selected plan to plan_id
      if (selectedPlan.name.includes('15 Days Free Trial') || selectedPlan.price === 0) {
        planId = 1; // Trial plan
      } else if (selectedPlan.name.includes('Annual Package') || selectedPlan.price === 999) {
        planId = 2; // Yearly plan
      } else {
        // Fallback: use the plan id from API response
        planId = selectedPlan.id;
      }
      
      console.log('Sending subscription request with plan_id:', planId);
      
      const subscriptionResponse = await subscribeUser(planId);
      
      console.log('Subscription API response:', subscriptionResponse);
      
      if (subscriptionResponse.status) {
        if (planId === 1) { // Trial plan
          setShowSubscriptionPopup(false);
          showToast('Free trial activated successfully! 🎉', true);
          // Refresh subscription status after successful trial activation
          setTimeout(() => {
            checkUserSubscription();
          }, 1000);
        } else if (planId === 2) { // Yearly plan
          if (subscriptionResponse.pay_url) {
            navigation.navigate(navigationString.PaymentScreen, { 
              subscription: {
                ...selectedPlan,
                plan_id: planId,
                subscription_id: subscriptionResponse.subscription_id
              },
              paymentUrl: subscriptionResponse.pay_url,
              onPaymentSuccess: () => {
                setShowSubscriptionPopup(false);
                showToast('Payment successful! Welcome to premium! 🎉', true);
                // Refresh subscription status after successful payment
                setTimeout(() => {
                  checkUserSubscription();
                }, 1000);
              },
              onPaymentFailure: (error) => {
                showToast('Payment failed. Please try again.', false);
                // Optionally check status again to see current state
                setTimeout(() => {
                  checkUserSubscription();
                }, 1000);
              }
            });
          } else {
            showToast('Payment URL not available. Please try again.', false);
          }
        }
      } else {
        const errorMessage = subscriptionResponse.message || 'Subscription failed. Please try again.';
        showToast(errorMessage, false);
      }
    } catch (error) {
      console.log('Subscription error:', error);
      let errorMessage = 'Network error. Please check your connection.';
      
      // More specific error handling
      if (error.response) {
        errorMessage = error.response.data?.message || 'Subscription failed. Please try again.';
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      showToast(errorMessage, false);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Back handler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          ' Exit From App ',
          ' Do you want to exit From App ?',
          [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => console.log('NO Pressed') }
          ],
          { cancelable: false },
        );
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress); };
    }, []),
  );

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx < -100) {
          console.log('Swipe left detected');
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BaseColor.whiteColor}}>
      <Tab.Navigator
        initialRouteName="ListActivity"
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            paddingBottom: responsiveHeight(0.2),
            paddingTop: responsiveHeight(0.5),
            height: 59,
          }
        })}>

        <Tab.Screen
          options={{
            tabBarIcon: (focused) => {
              return (
                <View>
                  <MaterialCommunityIcons name='menu' size={25} color={focused.focused ? BaseColor.primary : BaseColor.grayColor} />
                </View>
              )
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{ paddingBottom: responsiveHeight(0.5), color: focused ? BaseColor.primary : BaseColor.grayColor, fontSize: responsiveFontSize(1.4), fontFamily: focused ? Fonts.semiBold : Fonts.regular }}
              numberOfLines={1}>Activities</Text>
            ),
          }}
          name="ListActivity" component={ListActivity}></Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabel: (focused) => {
              return (
                <View style={styles.text}
                  backgroundColor={BaseColor.white} />)
            },
            tabBarIcon: (focused) => {
              return (
                <View>
                  <FontAwesome6 name='check' size={22} color={focused.focused ? BaseColor.primary : BaseColor.grayColor} />
                </View>)
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{letterSpacing: 0,  paddingBottom: Platform.OS === 'ios' ? responsiveHeight(0.5) :  responsiveHeight(0.8), color: focused ? BaseColor.primary : BaseColor.grayColor, fontSize: responsiveFontSize(1.4), fontFamily: focused ? Fonts.semiBold : Fonts.regular }}
              numberOfLines={1}
              ellipsizeMode="tail" >Followed</Text>
            ),
          }}
          name="Goals" component={Goals}
        ></Tab.Screen>

        <Tab.Screen
          options={{
            tabBarIcon: (focused) => {
              return (
                <View>
                  <FontAwesome5 name='search' size={19} color={focused.focused ? BaseColor.primary : BaseColor.grayColor} />
                </View>)
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{ paddingBottom: responsiveHeight(0.5), color: focused ? BaseColor.primary : BaseColor.grayColor, fontSize: responsiveFontSize(1.4), fontFamily: focused ? Fonts.semiBold : Fonts.regular }}>Explore</Text>
            ),
          }}
          name="Explore" component={Explore}></Tab.Screen>

        <Tab.Screen
          options={{
            tabBarIcon: (focused) => {
              return (
                <View>
                  <FontAwesome5 name='lightbulb' size={21} color={focused.focused ? BaseColor.primary : BaseColor.grayColor} />
                </View>)
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{ paddingBottom: responsiveHeight(0.5), color: focused ? BaseColor.primary : BaseColor.grayColor, fontSize: responsiveFontSize(1.4), fontFamily: focused ? Fonts.semiBold : Fonts.regular }}>Ponder</Text>
            ),
          }}
          name="Ponder" component={Ponder}></Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabel: (focused) => {
              return (
                <View style={styles.text}
                  backgroundColor={BaseColor.white} />)
            },
            tabBarIcon: (focused) => {
              return (
                <View>
                  <Image
                  source={Images.faq}
                  style={{ width: 23, height: 21, marginTop: responsiveHeight(0.2), tintColor: focused.focused ? BaseColor.primary : BaseColor.gray_new  }}
                />
                </View>)
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{ paddingBottom: responsiveHeight(0.5), color: focused ? BaseColor.primary : BaseColor.grayColor, fontSize: responsiveFontSize(1.4), fontFamily: focused ? Fonts.semiBold : Fonts.regular }}>FAQ</Text>
            ),
          }}
          name="Browser" component={FAQ}></Tab.Screen>
      </Tab.Navigator>

      {/* Subscription Popup */}
      <SubscriptionPopup
        visible={showSubscriptionPopup}
        onClose={() => setShowSubscriptionPopup(false)}
        onSelectSubscription={handleSubscriptionSelect}
        loading={subscriptionLoading}
        plans={subscriptionPlans}
        isSubscribing={isSubscribing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
  text: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginBottom: 7,
  }
});

export default withNetworkCheck(HomeScreen);