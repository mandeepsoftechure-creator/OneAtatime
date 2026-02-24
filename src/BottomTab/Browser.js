import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, Platform } from 'react-native'
import React from 'react'
import CustomHeaderHome from '../components/CustomHeaderHome'
import { BaseColor, useTheme } from '../config/theme'
import { LineChart } from 'react-native-chart-kit';
import CustomBrowserData from '../components/CustomBrowserData';
import CustomArrowIcon from '../components/CustomArrowIcon';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIPhoneXOrNewer } from '../constant/deviceUtils';

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["4", "5", "6", "7", "8", "9", "10", "11"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50, 100],
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Browser = () => {

  const {colors} = useTheme();
  const statusBarHeight = getStatusBarHeight();



  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: colors.background ,  
      
    }}>
      <View style={{ 
                paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ?  responsiveHeight(1) : statusBarHeight) : responsiveHeight(2),
                paddingBottom: responsiveHeight(2.5)
              }}> 



      <View style={[styles.header]}>
        <Text style={[styles.headerText, {color: colors.text_color}]}>FAQ</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center', 
          marginTop : responsiveHeight(1) ,
          marginBottom : responsiveHeight(0.4) }}>
            <View style={{ flex: 1, justifyContent: 'center'}}>
              <Text style={{
                fontSize: responsiveFontSize(1.6),
                lineHeight: responsiveFontSize(2),
                fontFamily: Fonts.semiBold,
                color: colors.text_color,
              
              }}>All Activity</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.5),
                lineHeight: responsiveFontSize(1.8),
                fontFamily: Fonts.bold,
                color: BaseColor.grayColor,
                marginTop: responsiveHeight(0.1)
              }}>May 28 - Jun 23</Text>
            </View>
            <CustomArrowIcon backgroundColor={BaseColor.whiteColor}
            icon={'chevron-left'}
            marginEnd={responsiveWidth(2)}
            elevation={2}></CustomArrowIcon>

          <CustomArrowIcon backgroundColor={BaseColor.whiteColor}
           icon={'chevron-right'}
            elevation={2}></CustomArrowIcon>

          </View>
      </View>

      <ScrollView style={{backgroundColor : colors.app_background}}>

        <View style={{
          marginHorizontal: responsiveWidth(5),
          marginVertical: responsiveHeight(1.5),
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          backgroundColor: colors.light,
          borderRadius: 15,
          elevation: 1,
        }}>

          <View style={styles.cardHeader}>
            <CustomArrowIcon backgroundColor={BaseColor.light}></CustomArrowIcon>
            <View style={{ flex: 1, justifyContent: 'center', marginStart: responsiveWidth(4) }}>
              <Text style={styles.cardTitle}>All Activity</Text>
              <Text style={{
                fontSize: responsiveFontSize(1.5),
                lineHeight: responsiveFontSize(2),
                fontFamily: Fonts.bold,
                color: BaseColor.grayColor,
                marginTop: responsiveHeight(0.3)
              }}>Summary</Text>
            </View>
            <CustomArrowIcon backgroundColor={BaseColor.whiteColor}
              icon={'chevron-down'}
              elevation={2}></CustomArrowIcon>
          </View>

          <CustomBrowserData
            marginTop={responsiveHeight(2)}
            lable_first={'SUCCESS RATE'}
            lable_second={'COMPLETED'}
            value_first={'%98'}
            value_second={'244'}
            color_first={BaseColor.greenColor}
            color_second={BaseColor.black}></CustomBrowserData>

          <CustomBrowserData
            marginTop={responsiveHeight(1.5)}
            lable_first={'POINTS EARNED'}
            lable_second={'BEST STREAK DAY'}
            value_first={'322'}
            value_second={'22'}
            color_first={BaseColor.yellowColor}
            color_second={BaseColor.black}></CustomBrowserData>


          <CustomBrowserData
            marginTop={responsiveHeight(1)}
            lable_first={'SKIPPED'}
            lable_second={'FAILED'}
            value_first={'4'}
            value_second={'2'}
            color_first={BaseColor.black}
            color_second={BaseColor.yellowColor}></CustomBrowserData>


          <View >
          </View>
        </View>

        <View style={[styles.card, {backgroundColor : colors.light}]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Habits</Text>
            {/* <MaterialIcons name="whatshot" size={24} color="orange" /> */}
          </View>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />


        </View>



      </ScrollView>

      </View>


    </SafeAreaView>
  )
}

{/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Happy</Text>
          </View>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View> */}

export default Browser

const styles = StyleSheet.create({

 
  header: {
    paddingHorizontal: responsiveWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.light,
  },
  headerText: {
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveFontSize(2.8),
    letterSpacing: 0,
    justifyContent: 'flex-start',
   
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  card: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderRadius: 15,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',

    // marginBottom: 10,
  },
  cardTitle: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.5),
    fontFamily: Fonts.semiBold,
    color: BaseColor.black,
  },
  cardBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  successRate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  completed: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bestStreak: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  skipped: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  failed: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
})