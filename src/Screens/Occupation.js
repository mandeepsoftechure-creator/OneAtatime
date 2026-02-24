import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Image, } from 'react-native'
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
import Images from '../assets/images/images'

const Occupation = ({ navigation, route }) => {


    const [loading, setLoading] = useState(false);
    const {colors} = useTheme();
    const [personal_details, setPersonal_Details] = useState();
    const { userData, saveUserData } = useUserData();
    const [selectedOccupation, setSelectedOccupation] = useState([]);

    const handleBackPress = () => {
        navigation.goBack();
    };

      const handleSelectedOccupation = (selectedItems) => {
        const noneOfTheAboveItem = personal_details.find(item => item.title === 'None of the above');
      if (noneOfTheAboveItem) {
        const noneOfTheAboveId = noneOfTheAboveItem.id;
        if (selectedItems.includes(noneOfTheAboveId)) {
            setSelectedOccupation([noneOfTheAboveId]);
        } else {
            setSelectedOccupation(selectedItems);
        }
      } else {
         
            setSelectedOccupation(selectedItems);
        // if (selectedItems.length > 0) {
            
        //   } else {
        //     console.error('None of the above item not found, and no items selected.');
        //   }
      }
        }

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const profileData = await getProfile();
                if (profileData.status) {
                    setPersonal_Details(profileData.personal_details_options.occupation);
                    setSelectedOccupation(userData.user.occupation_ids || []);
                }
            } catch (error) {
                console.log('Error fetching daily activities:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);


    const handleSubmit = async () => {
        console.log(selectOccupation)
        if (selectedOccupation.length === 0) {
            Toast.show('Please select Occupation', Toast.LONG);
        } else {
            try {
                setLoading(true);
        
                const data = {
                    occupations: selectedOccupation
                };

                console.log(data)
                const response = await updateProfile(data);
                if (response.status) {
                    saveUserData(response);
                    Toast.show(response.message, Toast.LONG);
                } else {
                    Toast.show(response.message, Toast.LONG);
                }
            } catch (error) {
                console.log('Error response:', error);
            } finally {
                setLoading(false);
            }
        }
    };

   
    const selectOccupation = selectedOccupation.length > 0 
    ? styles.selectTextSelected 
    : styles.selectTextNotSelected;


    return (

        <View style={[BaseStyle.safeAreaView, { backgroundColor: colors.app_background }]}>

            <CustomHeaderLogin icon_name='left' title="Lifestyle" onBackPress={handleBackPress} />

            <Loader visible={loading}></Loader>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveWidth(5) }}>

                <View>

                    <Text style={[styles.sectionTitle, {color : colors.text_color}]}>Lifestyle</Text>

                    <View style={[styles.card, {backgroundColor : colors.light}]}>

                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>

                            <View style={styles.dropdownContainer}>

                                <MultiSelect
                                    items={personal_details}
                                    uniqueKey="id"
                                    onSelectedItemsChange={handleSelectedOccupation}
                                    selectedItems={selectedOccupation}
                                    selectText="Select..."
                                    fontSize={responsiveFontSize(1.8)}
                                    selectedItemFontFamily={Fonts.semiBold}
                                    searchInputPlaceholderText="Search..."
                                    tagRemoveIconColor={BaseColor.primary}
                                    tagBorderColor={BaseColor.primary}
                                    tagTextColor={BaseColor.primary}
                                    selectedItemTextColor={BaseColor.primary}
                                    selectedItemIconColor={BaseColor.primary}
                                    itemTextColor={BaseColor.grayColor}
                                    displayKey="title"
                                    itemFontSize={responsiveFontSize(1.8)}
                                    fontFamily={Fonts.semiBold}
                                    itemFontFamily={Fonts.semiBold}
                                    styleDropdownMenuSubsection={[styles.multiSelectDropdown, selectOccupation]}
                                    altFontFamily={Fonts.semiBold}
                                   // styleIndicator={{ display: 'none' }} // Hide the default indicator
                                    onToggleSelector={false}
                                    styleRowList={{ borderBottomColor: BaseColor.light, borderBottomWidth: responsiveHeight(0.1), paddingVertical: responsiveHeight(0.5) }}
                                    styleListContainer={styles.searchInput}
                                    styleInputGroup={styles.searchInput}
                                    hideSubmitButton={true}
                                    styleTextDropdown={styles.textDropDown}
                                    hideDropdown={true}
                                    
                                
                                />
                            </View>

                        </View>


                    </View>



                </View>




            </ScrollView>

            <RegisterButton
                title="Update"
                style={{ textAlign: 'center', marginVertical: responsiveHeight(2), marginHorizontal: responsiveWidth(5) }}
                textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                onPress={() => handleSubmit()}
            />



        </View>

    )
}

export default withNetworkCheck(Occupation)

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.semiBold,
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
        paddingTop : 5,
    },

    textDropDown: {
        paddingHorizontal: Platform.OS === 'android' ? responsiveHeight(1.5) : responsiveHeight(2),
        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(1.8),
        lineHeight: responsiveFontSize(2.4),
        color: BaseColor.placeholder,
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
        fontSize: responsiveFontSize(1.8),
        paddingVertical: Platform.OS === 'ios' ? responsiveHeight(2) : 0,
        fontFamily: Fonts.regular,
        paddingHorizontal: responsiveWidth(1),
        borderWidth: 1,
        borderColor: BaseColor.light,
        borderRadius: 8,
        marginBottom: 5,
    },

    selectTextNotSelected: {
        paddingLeft: responsiveWidth(0), // Padding when no item is selected
        paddingBottom : 5,
        paddingTop : 5,
        paddingRight : 5
    },
    selectTextSelected: {
        paddingLeft: responsiveWidth(3),
        paddingBottom : 5,
        paddingTop : 5,
        paddingRight : 5,
        fontFamily : Fonts.regular,
        fontSize : responsiveFontSize(1.8)
    },
})