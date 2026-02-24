import { ActivityIndicator, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeaderLogin from '../components/CustomHeaderLogin'
import { BaseColor, useTheme } from '../config/theme'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import Icon from 'react-native-vector-icons/AntDesign'; // Ensure you have installed this library
import Images from '../assets/images/images'
import Loader from '../components/Loader'
import { useRoute } from '@react-navigation/native'
import { getActivitesDetails } from '../Api/user'
const { width, height } = Dimensions.get('window');
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIPhoneXOrNewer } from '../constant/deviceUtils'
import withNetworkCheck from '../Utils/withNetworkCheck'
import RenderHTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image'

const ExploreDetails = ({ navigation }) => {

  const { width } = useWindowDimensions();

  const statusBarHeight = getStatusBarHeight();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [activityDetails, setActivityDetails] = useState('');
  const [loadingimage, setimageLoading] = useState(true);


  console.log('image data>>>>>',activityDetails);

  const route = useRoute();
  const { item } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchActivitiesDetails = async () => {
      setLoading(true);
      console.log(item.id)
      try {
        const activitiesDetailsData = await getActivitesDetails(item.id);

        if (activitiesDetailsData.status) {
          setActivityDetails(activitiesDetailsData.data);
          // console.log(activitiesDetailsData)
          setLoading(false);
        } else {
          console.log(activitiesDetailsData.message)
          setLoading(false);
        }


      } catch (error) {
        console.log('Error fetching daily activities:', error);
        setLoading(false);
      }
    };

    fetchActivitiesDetails();
  }, []);


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      <View style={{
        paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? responsiveHeight(1) : statusBarHeight) : responsiveHeight(2),
        paddingBottom: responsiveHeight(2.5), flex: 1
      }}>

        <Loader visible={loading}></Loader>
        <View >

          <TouchableOpacity style={styles.headerContainer} onPress={handleBackPress}>
            <Icon name='left' size={20} color={colors.text_color} />
            <Text style={[styles.title, { color: colors.text_color }]}>{'Explore Activity'}</Text>
          </TouchableOpacity>


        </View>


        <View style={{ flex: 1, backgroundColor: colors.app_background }}>

          <Text style={[styles.title_full, { color: colors.text_color }]}>{item.name}</Text>

          {activityDetails?.featured_image_url ? (
            <View style={styles.imageContainer}>
              {loadingimage && (
                <ActivityIndicator
                  size="small"
                  color={BaseColor.yellowColor}
                  style={styles.loader}
                />
              )}

              <FastImage
                source={{
                  uri: activityDetails.featured_image_url,
                  priority: FastImage.priority.high,
                }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
                onLoadStart={() => setimageLoading(true)}
                onLoad={() => setimageLoading(false)}
                onError={() => setimageLoading(false)}
              />
            </View>
          ) : null}


          {/* <Text style={{ marginHorizontal: responsiveWidth(5), fontFamily: Fonts.semiBold, fontSize: responsiveFontSize(1.5), color : colors.text_color }}>
      {activityDetails.content ? activityDetails.content.replace(/<[^>]*>?/gm, '') : ''}</Text> */}
          <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: responsiveHeight(2), borderTopColor: BaseColor.light, borderTopWidth: 1 }}
            showsVerticalScrollIndicator={true}>

            <RenderHTML
              contentWidth={width}
              source={{ html: activityDetails.content }}
              tagsStyles={{
                p: { color: BaseColor.black, fontSize: responsiveFontSize(2.2), fontFamily: Fonts.semiBold },
                em: { color: BaseColor.black, fontFamily: Fonts.semiBold, fontSize: responsiveFontSize(2) },
                li: { color: BaseColor.black, fontSize: responsiveFontSize(2), fontFamily: Fonts.semiBold, marginBottom: 8 },
              }}
            />


          </ScrollView>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default withNetworkCheck(ExploreDetails)

const styles = StyleSheet.create({

  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    marginTop: responsiveHeight(15),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(2.5),
    borderBottomWidth: 0.8,
    borderBottomColor: BaseColor.light,
    paddingBottom: responsiveHeight(1.5),
    // backgroundColor: BaseColor.whiteColor,


  },

  title: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.9),
    fontFamily: Fonts.semiBold,
    paddingStart: responsiveWidth(2.5)
  },

  title_full: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(2.8),
    fontFamily: Fonts.semiBold,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1)

  },

  image: {
    height: '100%',
    width: '100%',
  },

  imageContainer: {
    height: responsiveHeight(30),
    width: width,
    // Adjust based on your design
    // marginHorizontal: responsiveWidth(200),
    paddingHorizontal: responsiveWidth(5),
    alignItems: 'center',
  },
})