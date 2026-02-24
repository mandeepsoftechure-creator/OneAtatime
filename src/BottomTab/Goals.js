import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Platform, Image, AppState } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeaderHome from '../components/CustomHeaderHome'
import { BaseColor, useTheme } from '../config/theme'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { dataList } from '../Data/data'
import ListItemGoal from '../components/ListItemGoal'
import { Fonts } from '../config/styles/fonts'
import { getDailyNewActivites, getMonthlyActivites, getWeeklyActivites } from '../Api/user'
import Loader from '../components/Loader'
import { useStatusBar } from '../AppStatusBar/AppStatusBar'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../assets/images/images'
import { useFocusEffect } from '@react-navigation/native';


const Goals = ({ navigation }) => {

  useStatusBar('dark-content', BaseColor.whiteColor);

  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [weeklyActivities, setWeeklyActivities] = useState([]);
  const [total_done_task_percentage, setTotal_done_task_percentage] = useState('');
  const [total_activity, setTotal_Activity] = useState('');
  const [total_done_activity, setTotal_Done_Activity] = useState('');
  const [weekly_or_monthly_activity_text, setWeekly_Activity_Text] = useState('');
  const [month_or_week, setWeek_Or_Month] = useState('');
  const [selection, setSelection] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchDailyActivities = async () => {
    try {
      setLoading(true)
      const weeklyActivitiesData = await getDailyNewActivites();
      setWeeklyActivities(weeklyActivitiesData.activities || []);
      setTotal_done_task_percentage(weeklyActivitiesData.total_done_task_percentage)
      setTotal_Activity(weeklyActivitiesData.total_task_in_a_day)
      setTotal_Done_Activity(weeklyActivitiesData.total_done_task)
      setWeekly_Activity_Text(weeklyActivitiesData.day_activity_text ?? 'Your Daily goals almost done!')
      setWeek_Or_Month(weeklyActivitiesData.day ?? '1');
      setLoading(false);
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
    }
  };


  const fetchWeeklyActivities = async () => {
    try {
      setLoading(true)
      const weeklyActivitiesData = await getWeeklyActivites();
      setWeeklyActivities(weeklyActivitiesData.activities || []);
      setTotal_done_task_percentage(weeklyActivitiesData.total_done_task_percentage)
      setTotal_Activity(weeklyActivitiesData.total_task_in_a_week)
      setTotal_Done_Activity(weeklyActivitiesData.total_done_task)
      setWeekly_Activity_Text(weeklyActivitiesData.weekly_activity_text ?? 'Your weekly goals almost done!')
      setWeek_Or_Month(weeklyActivitiesData.week ?? '7');
      setLoading(false);
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
    }
  };

  const fetchMonthlyActivities = async () => {
    try {
      setLoading(true)
      const monthlyActivitiesData = await getMonthlyActivites();
      setWeeklyActivities(monthlyActivitiesData.activities);
      setTotal_done_task_percentage(monthlyActivitiesData.total_done_task_percentage)
      setTotal_Activity(monthlyActivitiesData.total_task_in_a_month)
      setTotal_Done_Activity(monthlyActivitiesData.total_done_task)
      setWeekly_Activity_Text(monthlyActivitiesData.monthly_activity_text ?? 'Your monthly goals almost done!')
      setWeek_Or_Month(monthlyActivitiesData.month ?? '30');
      setLoading(false);
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchWeeklyActivities();
  // }, []);

  useEffect(() => {
    if (isInitialLoad) {
      // Initial API call when the app starts
      setIsInitialLoad(false); // Mark initial load as complete
    }

  const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (selection == 0) {
        fetchDailyActivities();
         }else if (selection == 1) {
        fetchWeeklyActivities(); 
        } else {
        fetchMonthlyActivities();
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // Clean up the listener
    };
  }, [appState, isInitialLoad]);


  useFocusEffect(
    useCallback(() => {
      if (selection == 0) {
        fetchDailyActivities();
       }else if (selection == 1) {
      fetchWeeklyActivities(); 
      } else {
        fetchMonthlyActivities();
      }
    }, [selection])
  );

  useEffect(() => {
    StatusBar.setBarStyle(colors.background === BaseColor.whiteColor ? 'dark-content' : 'light-content');
    StatusBar.setBackgroundColor(colors.background);
  }, [colors]);




  const renderItem = ({ item }) => (

    <ListItemGoal text={item.name} 
    backgroundColor={item.color_code != null ? item.color_code : BaseColor.whiteColor}
    done={selection === 0 
      ? item.daily_activity_done 
      : selection === 1 
      ? item.weekly_activity_done 
      : item.monthly_activity_done}
      total={month_or_week}
     
    />

  );

  return (

    <View style={{ flex: 1, backgroundColor: colors.app_background, paddingBottom: responsiveHeight(0) }}>

      <Loader visible={loading}></Loader>

      <CustomHeaderHome navigation={navigation} borderBottomWidth={1} header_text_name={'Accomplished'} />

      <View style={{ backgroundColor: colors.background }}>
        <View style={styles.btnGroup}>

          <TouchableOpacity
            style={[
              styles.btn,
              selection === 0 ? styles.btnclick : null,
            ]}
            onPress={() => setSelection(0) }>
            <Text
              style={[
                styles.btnText,
                selection === 0 ? styles.selectText : null,
              ]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity

            style={[
              styles.btn,
              selection === 1 ? styles.btnclick : null,
            ]}
            onPress={() =>  setSelection(1) }>
            <Text
              style={[
                styles.btnText,
                selection === 1 ? styles.selectText : null,
              ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              selection === 2 ? styles.btnclick : null,
            ]}
            onPress={() =>  setSelection(2)}>
            <Text
              style={[
                styles.btnText,
                selection === 2 ? styles.selectText : null,
              ]}>
              Month
            </Text>
          </TouchableOpacity>

        </View>

        <View style={{ borderBottomWidth: responsiveWidth(0.3), borderBottomColor: BaseColor.light, marginTop: responsiveHeight(1.5)}}></View>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ paddingHorizontal: responsiveWidth(5)}}>

          {weeklyActivities.length > 0 ? (


            <View style={styles.view}>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(3),
                marginVertical: responsiveHeight(1.5),
                backgroundColor: BaseColor.primary
              }}>
                {/* <View style={styles.view2} > */}
                  <Text style={styles.textWhite}>{total_done_task_percentage + ' - ' +weekly_or_monthly_activity_text}</Text>
                {/* </View> */}
                {/* <View style={{ flex: 1, marginStart: responsiveWidth(0) }}>
                  <Text style={styles.textWhite}>{}</Text> */}
                  {/* <Text style={styles.text_light}>{total_done_activity} of {total_activity} completed</Text> */}

                {/* </View> */}
              </View>
            </View>
          ) : null}
          {/* <LinearGradient
start={{x: 0.1, y: 0}} // top-left
end={{x: 1, y: 0}} // bottom-right
colors={[BaseColor.whiteColor, BaseColor.light, BaseColor.light]}
>      */}

          <FlatList
            style={{ paddingBottom: responsiveHeight(5) }}
            data={weeklyActivities}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id || 'key'}-${index}`}
            ListFooterComponent={<View style={{ height: responsiveHeight(5)}} />}
            ListEmptyComponent={
              <View style={styles.noDataContainer}>
                {/* <Image source={Images.image_splash_logo} style={styles.noDataImage} /> */}
                <Text style={styles.noDataText}>No data found</Text>
              </View>
            }
          />
        </View>

      </ScrollView>

    </View>
  )
}

export default Goals

const styles = StyleSheet.create({

  view: {
    backgroundColor: BaseColor.primary,
    borderRadius: 15,
    marginTop: responsiveHeight(1.2),
    marginBottom: responsiveHeight(1.5),
    paddingHorizontal : responsiveWidth(1),
    paddingVertical : responsiveHeight(1)
  },

  view2: {
   // borderWidth: responsiveWidth(0.4),
   // borderColor: BaseColor.whiteColor,
   // height: 50,
  //  width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.5),
    justifyContent: 'center',
    textAlign: 'center',
  },

  textWhite: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(3),
  },

  text_light: {
    color: BaseColor.light,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveFontSize(1.6),
    marginTop: responsiveHeight(0.5)

  },

  btnGroup: {
    flexDirection: 'row',
    backgroundColor: BaseColor.light,
    marginHorizontal: responsiveWidth(5),
    borderRadius: 30,
    elevation: 0,
    paddingVertical: responsiveHeight(0.3),
    paddingHorizontal: responsiveWidth(0.8),
  },

  btn: {
    flex: 1,

  },
  btnText: {
    textAlign: 'center',
    paddingVertical: responsiveHeight(0.5),
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(1.7),
    lineHeight: responsiveFontSize(2.3),
    color: BaseColor.grayColor,
    padding: 0,
  },

  btnclick: {
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 20,
  },
  selectText: {
    color: BaseColor.primary,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(1.7),
    lineHeight: responsiveFontSize(2.3),

  },

  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(10),
  },

  noDataImage: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.semiBold,
    color: BaseColor.primary,
    marginTop: responsiveHeight(2),
  },


})