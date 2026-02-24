import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { BaseColor, useTheme } from '../config/theme';
import { useStatusBar } from '../AppStatusBar/AppStatusBar';
import CustomHeaderHome from '../components/CustomHeaderHome';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../components/Loader';
import { getPonderDetails } from '../Api/user';
import { Fonts } from '../config/styles/fonts';
import ListItemExploreNew from '../components/ListItemExploreNew';


const Ponder = ({ navigation }) => {

  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [ponderDetails, setPonderDetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useStatusBar('dark-content', BaseColor.whiteColor);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPodnerDetails();
  }, []);

  const fetchPodnerDetails = async () => {
    setLoading(true);
    try {
      const ponderDetailsData = await getPonderDetails();
      console.log('Ponder Details Data:', ponderDetailsData)

      if (ponderDetailsData.status) {
        setPonderDetails(Array.isArray(ponderDetailsData.data) ? ponderDetailsData.data : []);
        console.log(ponderDetailsData)
        setLoading(false);
        setRefreshing(false);
      } else {
        console.log(ponderDetailsData.message)
        setLoading(false);
        setRefreshing(false);
      }


    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPodnerDetails();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingBottom: responsiveHeight(0) }}>
      <Loader visible={loading} />

      <CustomHeaderHome navigation={navigation} header_text_name={'Ponder'} />

      {!loading && ponderDetails.length === 0 && <View style={styles.noDataContainer}>
        {/* <Image source={Images.image_splash_logo} style={styles.noDataImage} /> */}
        <Text style={styles.noDataText}>No data found</Text>
      </View>}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: responsiveWidth(5) }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

       {ponderDetails.length > 0 &&
       
       <View style={styles.view}>

          <View style={{
            marginHorizontal: responsiveWidth(3),
            marginVertical: responsiveHeight(1.5),
            backgroundColor: BaseColor.primary
          }}>
            <Text style={styles.textWhite}>{'How to Use the App'}</Text>
          </View>
        </View>}
        {ponderDetails.map((item, index) => (
          <ListItemExploreNew
            key={`${item.label}-${index}`}
            question={item.label}
            answer={item.content}
            cardBackgroundColor={'#F0E2C3'}
          />
        ))}

      </ScrollView>


    </View>
  )
}

export default Ponder

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveWidth(10),
  },

  noDataText: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.semiBold,
    color: BaseColor.primary,
    marginTop: responsiveHeight(5),
  },

  view: {
    backgroundColor: BaseColor.primary,
    borderRadius: 15,
    paddingVertical : responsiveHeight(1),
    marginTop : responsiveHeight(1.5),
    paddingHorizontal : responsiveWidth(1),
    marginVertical : responsiveHeight(1.5),
  },

  textWhite: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(3),
  },


})
