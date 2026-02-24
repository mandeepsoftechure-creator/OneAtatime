import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeaderHome from '../components/CustomHeaderHome'
import { BaseColor, useTheme } from '../config/theme'
import { dataList } from '../Data/data'
import ListItem from '../components/ListItem'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ListItemExplore from '../components/ListItemExplore'
import { getActivites } from '../Api/user'
import Loader from '../components/Loader'
import navigationString from '../constant/navigationString'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../config/styles/fonts'

const Explore = ({navigation}) => {


  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {colors} = useTheme();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const activitiesData = await getActivites();
      console.log('vvvvvvvvvvvvvvvvvvvvvv' , activitiesData)
      setActivities(activitiesData.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log('Error fetching daily activities:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchActivities();
  }, []);
  
  const renderItem = ({ item }) => (
    <ListItemExplore 
    onPress={() => navigation.navigate(navigationString.ExploreDetails, {item})}
    backgroundColor={item.color_code != null ? item.color_code : BaseColor.whiteColor}
    text={item.name} 
    />
  );


  return (
    <View style={{flex : 1, backgroundColor : colors.app_background, paddingBottom: responsiveHeight(0)}}>

    <CustomHeaderHome navigation={navigation} header_text_name={'Explore'}/>

    <Loader visible={loading}></Loader>

    <ScrollView showsVerticalScrollIndicator={false}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>

{activities && !loading && <View style={styles.view}>

<View style={{
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: responsiveWidth(3),
  marginVertical: responsiveHeight(1.5),
  backgroundColor: BaseColor.primary
}}>
  {/* <View style={styles.view2} > */}
    <Text style={styles.textWhite}>{'Activities Explained'}</Text>
  {/* </View> */}
</View>
</View>    }


    <FlatList
        style={{
          paddingTop : responsiveHeight(1.5),
          paddingHorizontal : responsiveWidth(5),
         paddingBottom : responsiveHeight(5)
          
        }}
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>

    </View>
  )
}

export default Explore

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
    // justifyContent: 'center'
     
   },
 
   text: {
     color: BaseColor.whiteColor,
     fontFamily: Fonts.semiBold,
     fontSize: responsiveFontSize(2.2),
     lineHeight: responsiveFontSize(3),
    // justifyContent: 'center',
     textAlign: 'center',
   },
 
   textWhite: {
    color: BaseColor.whiteColor,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2.4),
    lineHeight: responsiveFontSize(3),
  },


})