import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert, AppState, BackHandler, FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BaseColor, useTheme } from '../config/theme';
import CustomHeaderHome from '../components/CustomHeaderHome';
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ListItem from '../components/ListItem';
import Loader from '../components/Loader';
import { getDailyActivites, removeActivities, saveActivities, subscribeUser } from '../Api/user';
import { useToast } from '../context/ToastContext';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import SubscriptionPopup from '../components/SubscriptionPopup';
import navigationString from '../constant/navigationString';

const ListActivity = ({ navigation }) => {
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [total_activity, setTotal_Activity] = useState('');
  const [total_done_activity, setTotal_Done_Activity] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [noData, setNoData] = useState(false);
  const [weekly_or_monthly_activity_text, setWeekly_Activity_Text] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);


  // console.log('hasSubscription', activities);

  const {colors} = useTheme();

  useStatusBar('dark-content', BaseColor.whiteColor);

  const fetchDailyActivities = async () => {
    setLoading(true);
    try {
      const dailyActivitiesData = await getDailyActivites();

      
      if(dailyActivitiesData.status){
        setActivities(dailyActivitiesData.data);
        setTotal_Activity(dailyActivitiesData.total_activity);
        setTotal_Done_Activity(dailyActivitiesData.total_done_activity);
        setWeekly_Activity_Text(dailyActivitiesData.day_activity_text ?? 'Your Daily goals almost done!');
        setNoData(false);
      } else {
        setNoData(true);
      }
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      showToast('Failed to load activities', false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };



  const handleSubscriptionSelect = async (subscription) => {
    console.log('Selected subscription:', subscription);
    setSubscriptionLoading(true);
    
    try {
      let planId;
      
      if (subscription.id === 'trial') {
        planId = 1;
      } else if (subscription.id === 'yearly') {
        planId = 2;
      } else {
        showToast('Invalid subscription selection', false);
        setSubscriptionLoading(false);
        return;
      }

      console.log('Sending subscription request with plan_id:', planId);
      
      const subscriptionResponse = await subscribeUser(planId);
      
      console.log('Subscription API response:', subscriptionResponse);
      
      if (subscriptionResponse.status) {
        if (subscription.id === 'trial') {
          setHasSubscription(false);
          setShowSubscriptionPopup(false);
          showToast('Free trial activated successfully! 🎉', true);
          fetchDailyActivities();
        } else if (subscription.id === 'yearly') {
          if (subscriptionResponse.pay_url) {
            navigation.navigate(navigationString.PaymentScreen, { 
              subscription: {
                ...subscription,
                plan_id: planId,
                subscription_id: subscriptionResponse.subscription_id
              },
              paymentUrl: subscriptionResponse.pay_url,
              onPaymentSuccess: () => {
                setHasSubscription(true);
                setShowSubscriptionPopup(false);
                showToast('Payment successful! Welcome to premium! 🎉', true);
                fetchDailyActivities();
              },
              onPaymentFailure: (error) => {
                showToast('Payment failed. Please try again.', false);
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
      showToast(errorMessage, false);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleSwipeLeft = async () => {
    Alert.alert(
      'Go back to App?',
      'Are you sure you want to go back to the app?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (isInitialLoad) {
      fetchDailyActivities();
      setIsInitialLoad(false);
    }

    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        fetchDailyActivities();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, isInitialLoad]);

  const handleSaveActivities = async (item) => {
    if (!hasSubscription && !showSubscriptionPopup) {
      setShowSubscriptionPopup(true);
      showToast('Please choose a subscription plan to continue', false);
      return;
    }

    setLoading(true);
    if (!item.is_daily_activity_done) {
      try {
        const saveactivities = await saveActivities(item.id);

        // console.log('saveactivities response:', saveactivities);
        

        if (saveactivities.status) {
          const updatedActivities = activities.map((activity) =>
            activity.id === item.id ? { ...activity, is_daily_activity_done: !activity.is_daily_activity_done } : activity
          );
          setActivities(updatedActivities);
          setTotal_Done_Activity(prev => prev + 1);
          showToast(saveactivities.message, true);
        } else {
          showToast('Failed to update activity', false);
        }
      } catch (error) {
        console.log('Error updating activity:', error);
        showToast('An error occurred while updating activity', false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const removeactivities = await removeActivities(item.id);
        if (removeactivities.status) {
          const updatedActivities = activities.map((activity) =>
            activity.id === item.id ? { ...activity, is_daily_activity_done: !activity.is_daily_activity_done } : activity
          );
          setActivities(updatedActivities);
          setTotal_Done_Activity(prev => prev - 1);
          showToast(removeactivities.message, false);
        } else {
          showToast('Failed to update activity', false);
        }
      } catch (error) {
        console.log('Error updating activity:', error);
        showToast('An error occurred while updating activity', false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content');
    StatusBar.setBackgroundColor(colors.background);
  }, [colors]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDailyActivities();
  }, []);

  const renderItem = ({ item }) => (
    
    <ListItem 
      onPress={() => handleSaveActivities(item)} 
      text={item.name} 
      status={item.is_daily_activity_done}
      backgroundColor={item.color_code != null ? item.color_code : BaseColor.whiteColor} 
    />
  );

  const memoizedActivities = useMemo(() => activities, [activities]);

  
  
  const memoizedTotalActivity = useMemo(() => total_activity, [total_activity]);
  const memoizedTotalDoneActivity = useMemo(() => total_done_activity, [total_done_activity]);

  const ListHeaderComponent = () => (
    <View>
      {memoizedActivities.length > 0 && (
        <View style={styles.view}>
          <View style={styles.headerContent}>
            <Text style={styles.textWhite}>
              {memoizedTotalDoneActivity + '/' + memoizedTotalActivity} - {weekly_or_monthly_activity_text}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Loader visible={loading || subscriptionLoading} />
      
      <CustomHeaderHome navigation={navigation} header_text_name={'Activities'} />
      
      <FlatList
        data={memoizedActivities}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={
          <View style={styles.noDataContainer}>
            {noData && (
              <Text style={styles.noDataText}>No activities found</Text>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[BaseColor.primary]}
            tintColor={BaseColor.primary}
          />
        }
      />

      <SubscriptionPopup
        visible={showSubscriptionPopup}
        onClose={() => setShowSubscriptionPopup(false)}
        onSelectSubscription={handleSubscriptionSelect}
        loading={subscriptionLoading}
      />
    </View>
  );
};

export default ListActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(0),
  },
  flatListContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(5),
    flexGrow: 1,
  },
  textWhite: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(3),
    textAlign: 'center',
  },
  view: {
    backgroundColor: BaseColor.primary,
    borderRadius: 15,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1)
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1.5),
    backgroundColor: BaseColor.primary
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(10),
  },
  noDataText: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.semiBold,
    color: BaseColor.primary,
    marginTop: responsiveHeight(2),
  },
});