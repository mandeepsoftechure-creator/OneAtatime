import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Dimensions, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BaseStyle } from '../config/styles/BaseStyle'
import { BaseColor, FontSupport, useTheme } from '../config/theme'
import CustomHeaderLogin from '../components/CustomHeaderLogin'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import CustomEditText from '../components/CustomEditText'
import RadioGroup from '../components/RadioGroup'
import CustomEditTextHeight from '../components/CustomEditTextHeight'
import MultiSelect from 'react-native-multiple-select'
import { useRoute } from '@react-navigation/native'
import DatePicker from '../components/DatePicker'
import Toast from 'react-native-simple-toast';
import { s } from 'react-native-size-matters'
import { savePersonalDetails } from '../Api/auth'
import Loader from '../components/Loader'
import { setUserData } from '../Data/asyncStorage'
import navigationString from '../constant/navigationString'
import babelConfig from '../../babel.config'
import { getProfile, updateProfile } from '../Api/user'
import { useUserData } from '../context/UserDataContext'
import withNetworkCheck from '../Utils/withNetworkCheck'
import RegisterButton from '../components/RegisterButton'
import RenderHTML from 'react-native-render-html';


const contentWidth = Dimensions.get('window').width;


const Message = ({ navigation, route }) => {


    const [loading, setLoading] = useState(false);
    const {colors} = useTheme();

    const handleBackPress = () => {
        navigation.replace(navigationString.HomeScreen)
    };

    const source = {
        html: route?.params?.message,
      };       
      
      
      console.log(route?.params?.message)

    const handleSubmit = async () => {
        navigation.replace(navigationString.HomeScreen)
    };

   
    return (

        <View style={[BaseStyle.safeAreaView, { backgroundColor: colors.app_background }]}>

            <CustomHeaderLogin icon_name='left' title="Manual" onBackPress={handleBackPress} />

            <Loader visible={loading}></Loader>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveWidth(5) }}>

             <RenderHTML contentWidth={contentWidth} source={source}/>

            </ScrollView>

            <RegisterButton
                title="OK"
                style={{ textAlign: 'center', marginVertical: responsiveHeight(2), marginHorizontal: responsiveWidth(5) }}
                textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                onPress={() => handleSubmit()}
            />



        </View>

    )
}

export default withNetworkCheck(Message)

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.bold,
        marginVertical: responsiveHeight(1),
        lineHeight: responsiveFontSize(4)
    },
    inputContainer: {
        marginBottom: 15,
        marginTop: responsiveWidth(5),

    },

    multiSelectDropdown: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: BaseColor.light,
        color: BaseColor.black,
        elevation: 1,
        paddingLeft: responsiveWidth(2),
        fontFamily: Fonts.semiBold,


    },

    textDropDown: {
        paddingHorizontal: Platform.OS === 'android' ? responsiveHeight(1.5) : responsiveHeight(2),
        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(1.8),
        lineHeight: responsiveFontSize(2.4),
        color: BaseColor.black,
    },

    card: {
        paddingHorizontal: responsiveWidth(2),
        borderRadius: 8,
    },
    radioGroup: {
        marginVertical: responsiveHeight(1),
    },

    groupContainer: {
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(1)
    },

    dropdownContainer: {
        position: 'relative',
    },

    customIndicator: {
        position: 'absolute',
        top: responsiveHeight(1.5), // Adjust as needed
        right: responsiveWidth(5), // Adjust as needed
        zIndex: 1,
    },

    searchInput: {
        color: BaseColor.light,
        fontSize: responsiveFontSize(2),
        paddingVertical: Platform.OS === 'ios' ? responsiveHeight(2) : 0,
        fontFamily: Fonts.regular,
        paddingHorizontal: responsiveWidth(2),
        borderWidth: 1,
        borderColor: BaseColor.light,
        borderRadius: 8,
        marginBottom: 5
    },

    selectTextNotSelected: {
        paddingLeft: responsiveWidth(0), // Padding when no item is selected
    },
    selectTextSelected: {
        paddingLeft: responsiveWidth(3),
    },
})