import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeaderHome from '../components/CustomHeaderHome'
import { BaseColor, useTheme } from '../config/theme'
import { dataList } from '../Data/data'
import ListItem from '../components/ListItem'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ListItemExplore from '../components/ListItemExplore'
import { getActivites, getFaqs } from '../Api/user'
import Loader from '../components/Loader'
import navigationString from '../constant/navigationString'
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItemExploreNew from '../components/ListItemExploreNew'
import { Fonts } from '../config/styles/fonts'

const FAQ = ({ navigation }) => {


  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  const fetchFaq = async () => {
    setLoading(true);
    try {
      const faqData = await getFaqs();
      console.log('vvvvvvvvvvvvvvvvvvvvvv', faqData)
      setFaq(faqData.faqs);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFaq();
  }, []);

  const renderItem = ({ item }) => (
    <ListItemExploreNew
      onPress={() => { }}
      question={item.question}
      answer={item.answer}
      cardBackgroundColor={'#F2EAE0'}
    />
  );


  return (
    <View style={{ flex: 1, backgroundColor: colors.app_background, paddingBottom: responsiveHeight(0) }}>

      <CustomHeaderHome navigation={navigation} header_text_name={'FAQ'} />

      <Loader visible={loading}></Loader>

      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>


       {faq && !loading && <View style={styles.view}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: responsiveWidth(3),
            marginVertical: responsiveHeight(1.5),
            backgroundColor: BaseColor.primary
          }}>
            {/* <View style={styles.view2} > */}
              <Text style={styles.textWhite}>{'Frequently Asked Questions'}</Text>
            {/* </View> */}
          </View>
        </View>}


        <FlatList
          style={{
            paddingTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5),
            paddingBottom: responsiveHeight(5)

          }}
          data={faq}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>

    </View>
  )
}

export default FAQ

const styles = StyleSheet.create({

  view: {
    backgroundColor: BaseColor.primary,
    borderRadius: 15,
    paddingVertical : responsiveHeight(1),
    marginHorizontal : responsiveWidth(5),
    marginTop : responsiveHeight(1.5),
    paddingHorizontal : responsiveWidth(1),
  },

  view2: {
     borderRadius: 30,
     alignItems: 'center',
     justifyContent: 'center'
     
   },
 
   text: {
     color: BaseColor.whiteColor,
     fontFamily: Fonts.semiBold,
     fontSize: responsiveFontSize(2.1),
     lineHeight: responsiveFontSize(3),
     justifyContent: 'center',
     textAlign: 'center',
    //  paddingStart : responsiveWidth(1.5)
   },

   textWhite: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(3),
  },

 
})
