import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BaseStyle } from '../config/styles/BaseStyle'
import { BaseColor, FontSupport, useTheme } from '../config/theme'
import CustomHeaderLogin from '../components/CustomHeaderLogin'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts } from '../config/styles/fonts'
import CustomEditText from '../components/CustomEditText'
import RadioGroup from '../components/RadioGroup'
import CustomEditTextHeight from '../components/CustomEditTextHeight'
import RegisterButton from '../components/RegisterButton'
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
import { useUserData } from '../context/UserDataContext'
import withNetworkCheck from '../Utils/withNetworkCheck'
import RadioGroupGender from '../components/RadioGroupGender'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomEditTextNew from '../components/CustomEditTextNew'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


const ProfileData = ({ navigation, route }) => {

    const { personal_details, email, mobile } = route.params;
    const { userData, saveUserData } = useUserData();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(undefined);
    const [age, setAge] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [weight, setWeight] = useState(undefined);
    const [sex, setSex] = useState(undefined);
    const [alcohol, setAlcohol] = useState(true);
    const [smoking, setSmoking] = useState(true);
    const [outsideFood, setOutsideFood] = useState(true);
    const [selectedHealthChallenges, setSelectedHealthChallenges] = useState([]);
    const [selectedFamilyIllnesses, setSelectedFamilyIllnesses] = useState([]);
    const [selectedPastDisease, setSelectedPastDisease] = useState([]);
    const [selectedOccupation, setSelectedOccupation] = useState([]);

    const [selectedDate, setSelectedDate] = useState(undefined);

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [finalData, setFinalData] = useState({});


    useEffect(() => {
        const initialData = {};
        personal_details.personal_history.forEach(item => {
            initialData[item.id] = "No"; // Set all values to "No"
        });
        setFinalData(initialData);
    }, []);


    // const handleSelectedHealthItemsChange = (selectedItems) => {
    //     const noneOfTheAboveId = personal_details.health_challenges.length; // Change this to match the id of your "None of the above" item

    //     if (selectedItems.includes(noneOfTheAboveId)) {
    //       setSelectedHealthChallenges([noneOfTheAboveId]);
    //     } else {
    //       setSelectedHealthChallenges(selectedItems);
    //     }
    //   };

    const handleSelectedHealthItemsChange = (selectedItems) => {
        const noneOfTheAboveItem = personal_details.health_challenges.find(item => item.title === 'None of the above');
        console.log(selectedItems)
        if (noneOfTheAboveItem) {
            const noneOfTheAboveId = noneOfTheAboveItem.id;
            if (selectedItems.includes(noneOfTheAboveId)) {
                setSelectedHealthChallenges([noneOfTheAboveId]);
            } else {
                setSelectedHealthChallenges(selectedItems);
            }
        } else {
             setSelectedHealthChallenges(selectedItems);
            // if (selectedItems.length > 0) {
               
            //   } else {
            //     console.error('None of the above item not found, and no items selected.');
            //   }
        }
    }

    //   const handleSelectedFamilyItemsChange = (selectedItems) => {
    //     const noneOfTheAboveId = personal_details.family_illnesses.length; // Change this to match the id of your "None of the above" item

    //     if (selectedItems.includes(noneOfTheAboveId)) {
    //         setSelectedFamilyIllnesses([noneOfTheAboveId]);
    //     } else {
    //         setSelectedFamilyIllnesses(selectedItems);
    //     }
    //   };

    const handleSelectedFamilyItemsChange = (selectedItems) => {
        const noneOfTheAboveItem = personal_details.family_illnesses.find(item => item.title === 'None of the above');
        if (noneOfTheAboveItem) {
            const noneOfTheAboveId = noneOfTheAboveItem.id;
            if (selectedItems.includes(noneOfTheAboveId)) {
                setSelectedFamilyIllnesses([noneOfTheAboveId]);
            } else {
                setSelectedFamilyIllnesses(selectedItems);
            }
        } else {
            setSelectedFamilyIllnesses(selectedItems);
        }
    }

    const handleSelectedPastDiseaseChange = (selectedItems) => {
        const noneOfTheAboveItem = personal_details.past_diseases.find(item => item.title === 'None of the above');
        if (noneOfTheAboveItem) {
            const noneOfTheAboveId = noneOfTheAboveItem.id;
            if (selectedItems.includes(noneOfTheAboveId)) {
                setSelectedPastDisease([noneOfTheAboveId]);
            } else {
                setSelectedPastDisease(selectedItems);
            }
        } else {

            setSelectedPastDisease(selectedItems);
           
        }
    }


    const handleSelectedOccupationChange = (selectedItems) => {
        const noneOfTheAboveItem = personal_details.occupation.find(item => item.title === 'None of the above');
        if (noneOfTheAboveItem) {
            const noneOfTheAboveId = noneOfTheAboveItem.id;
            if (selectedItems.includes(noneOfTheAboveId)) {
                setSelectedOccupation([noneOfTheAboveId]);
            } else {
                setSelectedOccupation(selectedItems);
            }
        } else {
            setSelectedOccupation(selectedItems);
         
        }
    }


    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleOptionChange = (id, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };


    const handleSubmit = async () => {
     
        if (!name) {
            Toast.show('Please enter name', Toast.LONG);
        } else if (!selectedDate) {
            Toast.show('Please Select age', Toast.LONG);
        } else if (!sex) {
            Toast.show('Please Select Gender', Toast.LONG);
        } else if (!height) {
            Toast.show('Please Enter Height', Toast.LONG);
        } else if (!weight) {
            Toast.show('Please Enter Weight', Toast.LONG);
        } else if (selectedOccupation.length === 0) {
            Toast.show('Please select Occupation', Toast.LONG);
        } else if (!selectedOptions.length > 0) {
            Toast.show('Please Select Personal History', Toast.LONG);

            // } else if (Object.keys(selectedOptions).length === 2) {
            //     Toast.show('Please Select Personal History', Toast.LONG);
        } else if (selectedHealthChallenges.length === 0) {
            Toast.show('Please select health challenges', Toast.LONG);
        } else if (selectedPastDisease.length === 0) {
            Toast.show('Please select past disease', Toast.LONG);
        } else if (selectedFamilyIllnesses.length === 0) {
            Toast.show('Please select family illnesses', Toast.LONG);

        } else {
            try {
                setLoading(true);
                let token = await AsyncStorage.getItem('@fcm_device_token');

                if (token == null) {
                  const token_new = await messaging().getToken();
                  token = token_new;
                  // Save the new token to AsyncStorage for future use
                  await AsyncStorage.setItem('@fcm_device_token', token);
                }

                
                const data = {
                    name,
                    email,
                    mobile,
                    age: selectedDate,
                    sex,
                    height,
                    weight,
                    personal_history: finalData,
                    health_challenges: selectedHealthChallenges,
                    family_illnesses: selectedFamilyIllnesses,
                    past_diseases: selectedPastDisease,
                    occupations: selectedOccupation,
                    fcm_token : token
                };

                console.log(data, 'data----------');

               const response = await savePersonalDetails(data);

                if (response.status == true) {
                    console.log(response)
                    saveUserData(response);
                    navigation.replace(navigationString.Message, { message: response.content_message })
                    Toast.show(response.message, Toast.LONG);


                } else {
                    Toast.show(response.message, Toast.LONG);
                }
            } catch (error) {

                console.log('Error response:', error);
            } finally {
                setLoading(false);
            }
            console.log(selectedOptions, selectedHealthChallenges, selectedFamilyIllnesses);
        }
    }

    const selectHealthStyle = selectedHealthChallenges.length > 0
        ? styles.selectTextSelected
        : styles.selectTextNotSelected;

    const selectFamilyStyle = selectedFamilyIllnesses.length > 0
        ? styles.selectTextSelected
        : styles.selectTextNotSelected;

    const selectPastStyle = selectedPastDisease.length > 0
        ? styles.selectTextSelected
        : styles.selectTextNotSelected;

    const selectOccupationStyle = selectedOccupation.length > 0
        ? styles.selectTextSelected
        : styles.selectTextNotSelected;



    // const handleSelection = (name,id) => {
    //     if (name === "None") {
    //         // Only select "None"
    //         setSelectedOptions(["None"]);
    //     } else {
    //         if (selectedOptions.includes(name)) {
    //             // Remove if already selected
    //             setSelectedOptions(selectedOptions.filter(option => option !== name));
    //         } else {
    //             // Add to the selected options, excluding "None"
    //             const updatedSelection = [...selectedOptions.filter(option => option !== "None"), name];
    //             setSelectedOptions(updatedSelection);
    //         }
    //     }
    // };

    const handleSelection = (name, id) => {
        setFinalData(prevData => {
            const updatedData = { ...prevData }; // Create a copy of the current state
    
            if (name === "None") {
                // Only select "None"
                Object.keys(updatedData).forEach(key => {
                    updatedData[key] = "No"; // Set all to "No"
                });
                updatedData[id] = "Yes"; // Set "None" to "Yes"
            } else {
                // Update the selected item based on its ID
                updatedData[id] = updatedData[id] === "Yes" ? "No" : "Yes"; // Toggle the selection
                
                // If "None" is selected, set it to "No"
                if (updatedData[id] === "Yes") {
                    updatedData["6"] = "No"; // Assuming "6" corresponds to "None"
                }
            }
    
            return updatedData; // Return the updated state
        });
    
        // Handle selected options (optional)
        if (name === "None") {
            setSelectedOptions(["None"]); // Set selected options only to "None"
        } else {
            setSelectedOptions(prevOptions => {
                if (prevOptions.includes(name)) {
                    return prevOptions.filter(option => option !== name); // Remove if already selected
                } else {
                    return [...prevOptions.filter(option => option !== "None"), name]; // Exclude "None"
                }
            });
        }
    };
    

    
    

    return (

        <View style={[BaseStyle.safeAreaView, { backgroundColor: colors.app_background }]}>

            <CustomHeaderLogin icon_name='left' title="Your Profile" onBackPress={handleBackPress} />

            <Loader visible={loading}></Loader>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveWidth(5) }}>

                <View>
                    <Text style={[styles.sectionTitle, { color: colors.text_color }]}>Personal Details</Text>

                    <View style={[styles.card, { backgroundColor: colors.light }]}>

                        <CustomEditTextNew text_name={'Name'}
                            main_style={{ paddingHorizontal: responsiveHeight(0.5), paddingTop: responsiveHeight(1) }}
                            style_view={{ backgroundColor: BaseColor.light }}
                            placeholder={'Enter...'}
                            text_style={{ color: BaseColor.black }}
                            input_style={{ color: BaseColor.black }}
                            onTextChange={(text) => { setName(text) }}
                        />

                        <DatePicker
                            main_style={{ paddingHorizontal: responsiveHeight(0.5), paddingTop: responsiveHeight(2) }}
                            text_name={'Age'}
                            style_view={{ backgroundColor: BaseColor.light }}
                            placeholder={'dd/mm/yyyy'}
                            onChangeText={handleDateChange}
                        />


                        <View style={{
                            marginTop: responsiveWidth(4),
                            paddingHorizontal: responsiveHeight(0.5)
                        }}>

                            <RadioGroupGender
                                title={'Gender'}
                                options={[
                                    { label: 'Male', value: '1' },
                                    { label: 'Female', value: '0' },
                                    { label: 'Other', value: '2' },
                                ]}
                                selectedOption={sex}
                                onOptionChange={setSex}
                                isEdit={true}
                            />

                        </View>



                        <View style={styles.inputContainer}>

                            <CustomEditTextHeight
                                title={'Height'}
                                value={height}
                                onChangeText={setHeight}
                                placeholder={'Enter...'}
                                text_style={{ color: BaseColor.black }}
                                input_style={{ color: BaseColor.black }}
                                maxLength={3}
                                minLength={2}
                                text={'cm'}></CustomEditTextHeight>

                            <CustomEditTextHeight
                                title={'Weight'}
                                style={{ marginTop: responsiveHeight(2) }}
                                value={weight}
                                placeholder={'Enter...'}
                                onChangeText={setWeight}
                                maxLength={3}
                                text={'kg'}></CustomEditTextHeight>
                        </View>


                        <Text style={[styles.sectionTitle, {
                            color: BaseColor.black, marginVertical: responsiveHeight(1.2),
                            fontSize: responsiveFontSize(1.9),
                            fontFamily: Fonts.semiBold,
                            color: BaseColor.black,
                            lineHeight: responsiveFontSize(2.3),
                            paddingHorizontal: responsiveHeight(0.5)
                        }]}>Lifestyle</Text>

                        <View style={styles.dropdownContainer}>

                            <MultiSelect
                                items={personal_details.occupation}
                                uniqueKey="id"
                                onSelectedItemsChange={handleSelectedOccupationChange}
                                selectedItems={selectedOccupation}
                                selectText="Select..."
                                selectedItemFontFamily={Fonts.semiBold}
                                searchInputPlaceholderText="Search..."
                                itemFontSize={responsiveFontSize(1.8)}
                                fontSize={responsiveFontSize(1.8)}
                                fontFamily={Fonts.semiBold}
                                itemFontFamily={Fonts.semiBold}
                                tagRemoveIconColor={BaseColor.primary}
                                tagBorderColor={BaseColor.primary}
                                tagTextColor={BaseColor.primary}
                                selectedItemTextColor={BaseColor.primary}
                                selectedItemIconColor={BaseColor.primary}
                                itemTextColor={BaseColor.grayColor}
                                displayKey="title"
                                styleDropdownMenuSubsection={[styles.multiSelectDropdown, selectOccupationStyle]}
                                altFontFamily={Fonts.semiBold}
                                // styleIndicator={{ display: 'none' }} // Hide the default indicator
                                styleRowList={{ borderBottomColor: BaseColor.light, borderBottomWidth: responsiveHeight(0.1), paddingVertical: responsiveHeight(0.5) }}
                                styleListContainer={styles.searchInput}
                                styleInputGroup={styles.searchInput}
                                hideSubmitButton={true}
                                styleTextDropdown={styles.textDropDown}
                                textInputProps={{ autoFocus: false }}
                                hideDropdown={true} />

                        </View>



                    </View>



                    {/* <View style={[styles.card, { backgroundColor: colors.light, marginTop: responsiveHeight(3) }]}>



                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>




                        </View>
                    </View> */}


                    <Text style={[styles.sectionTitle, { color: colors.text_color, marginTop: responsiveHeight(1) }]}>Personal History</Text>


                    <View style={[{ backgroundColor: colors.light, borderRadius: 8 }]}>


                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginVertical: 16, flex: 1, }}
                        >

                            {personal_details.personal_history.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleSelection(item.name , item.id)}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',  // Vertically center the contents
                                        alignItems: 'center',
                                    }}
                                >
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', flex: 1,
                                    }}>

                                        <Text style={{
                                            fontSize: responsiveFontSize(1.8),
                                            lineHeight: responsiveFontSize(2.3),
                                            fontFamily: Fonts.semiBold,
                                            color: BaseColor.placeholder,
                                            letterSpacing: 0.8,
                                            // flex: 1,

                                        }}>{item.name}</Text>

                                        <FontAwesome
                                            name={selectedOptions.includes(item.name) ? 'check-square' : 'square-o'} 
                                            size={20}
                                            color={selectedOptions.includes(item.name) ? BaseColor.primary : BaseColor.grayColor}
                                            style={{ paddingLeft: 8 }} // You can adjust the margin for spacing if needed
                                        />
                                    </View>


                                </TouchableOpacity>
                            ))}

                        </ScrollView>

                        {/* {console.log(personal_details.personal_history)}
                            {personal_details.personal_history.map((item) => (
                                <View key={item.id} style={styles.groupContainer}>
                                    <RadioGroup
                                        title={item.name}
                                        sub_title={item.sub_title}
                                        options={item.title_values.map((option) => ({
                                            label: option.title,
                                            value: option.title,
                                            sub_title: option.short_description,
                                        }))}
                                        selectedOption={selectedOptions[item.id]}
                                        onOptionChange={(value) => handleOptionChange(item.id, value)}
                                        style={styles.radioGroup}
                                        visible={true} // or you can set it based on some condition
                                        isEdit={true}
                                    />
                                </View>
                            ))} */}



                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text_color }]}>Health Challenges</Text>

                    <View style={[styles.card, { backgroundColor: colors.light }]}>

                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>

                            <View style={styles.dropdownContainer}>

                                <MultiSelect
                                    // styleIndicator={{ display: 'none' }} // Hide the default indicator
                                    styleRowList={{ borderBottomColor: BaseColor.light, borderBottomWidth: responsiveHeight(0.1), paddingVertical: responsiveHeight(0.5) }}
                                    items={personal_details.health_challenges}
                                    uniqueKey="id"
                                    onSelectedItemsChange={handleSelectedHealthItemsChange}
                                    selectedItems={selectedHealthChallenges}
                                    selectText="Select..."
                                    selectedItemFontFamily={Fonts.semiBold}
                                    itemFontSize={responsiveFontSize(1.8)}
                                    fontSize={responsiveFontSize(1.8)}
                                    fontFamily={Fonts.semiBold}
                                    itemFontFamily={Fonts.semiBold}
                                    searchInputPlaceholderText="Search..."
                                    tagRemoveIconColor={BaseColor.primary}
                                    tagBorderColor={BaseColor.primary}
                                    tagTextColor={BaseColor.primary}
                                    selectedItemTextColor={BaseColor.primary}
                                    selectedItemIconColor={BaseColor.primary}
                                    itemTextColor={BaseColor.grayColor}
                                    displayKey="title"
                                    hideDropdown={true}
                                    styleListContainer={styles.searchInput}
                                    styleInputGroup={styles.searchInput}
                                    hideSubmitButton={true}
                                    styleDropdownMenuSubsection={[styles.multiSelectDropdown, selectHealthStyle]}
                                    altFontFamily={Fonts.semiBold}
                                    textInputProps={{ autoFocus: false }}
                                    styleTextDropdown={styles.textDropDown} />
                            </View>

                        </View>


                    </View>


                    <Text style={[styles.sectionTitle, { color: BaseColor.black }]}>Past Disease</Text>


                    <View style={[styles.card, { backgroundColor: colors.light }]}>

                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>


                            <View style={styles.dropdownContainer}>

                                <MultiSelect
                                    items={personal_details.past_diseases}
                                    uniqueKey="id"
                                    onSelectedItemsChange={handleSelectedPastDiseaseChange}
                                    selectedItems={selectedPastDisease}
                                    selectText="Select..."
                                    selectedItemFontFamily={Fonts.semiBold}
                                    searchInputPlaceholderText="Search..."
                                    tagRemoveIconColor={BaseColor.primary}
                                    tagBorderColor={BaseColor.primary}
                                    itemFontSize={responsiveFontSize(1.8)}
                                    fontSize={responsiveFontSize(1.8)}
                                    fontFamily={Fonts.semiBold}
                                    itemFontFamily={Fonts.semiBold}
                                    tagTextColor={BaseColor.primary}
                                    selectedItemTextColor={BaseColor.primary}
                                    selectedItemIconColor={BaseColor.primary}
                                    itemTextColor={BaseColor.grayColor}
                                    displayKey="title"
                                    styleDropdownMenuSubsection={[styles.multiSelectDropdown, selectPastStyle]}
                                    altFontFamily={Fonts.semiBold}
                                    hideDropdown={true}
                                    //styleIndicator={{ display: 'none' }} // Hide the default indicator
                                    styleRowList={{ borderBottomColor: BaseColor.light, borderBottomWidth: responsiveHeight(0.1), paddingVertical: responsiveHeight(0.5) }}
                                    styleListContainer={styles.searchInput}
                                    styleInputGroup={styles.searchInput}
                                    hideSubmitButton={true}
                                    textInputProps={{ autoFocus: false }}
                                    styleTextDropdown={styles.textDropDown} />

                            </View>


                        </View>
                    </View>


                    <Text style={[styles.sectionTitle, { color: BaseColor.black }]}>Family Illnesses</Text>


                    <View style={[styles.card, { backgroundColor: colors.light }]}>

                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>

                            <View style={styles.dropdownContainer}>

                                <MultiSelect
                                    items={personal_details.family_illnesses}
                                    uniqueKey="id"
                                    onSelectedItemsChange={handleSelectedFamilyItemsChange}
                                    selectedItems={selectedFamilyIllnesses}
                                    selectText="Select..."
                                    selectedItemFontFamily={Fonts.semiBold}
                                    searchInputPlaceholderText="Search..."
                                    itemFontSize={responsiveFontSize(1.8)}
                                    fontSize={responsiveFontSize(1.8)}
                                    fontFamily={Fonts.semiBold}
                                    itemFontFamily={Fonts.semiBold}
                                    tagRemoveIconColor={BaseColor.primary}
                                    tagBorderColor={BaseColor.primary}
                                    tagTextColor={BaseColor.primary}
                                    selectedItemTextColor={BaseColor.primary}
                                    selectedItemIconColor={BaseColor.primary}
                                    itemTextColor={BaseColor.grayColor}
                                    displayKey="title"
                                    styleDropdownMenuSubsection={[styles.multiSelectDropdown, selectFamilyStyle]}
                                    altFontFamily={Fonts.semiBold}
                                    hideDropdown={true}
                                    // styleIndicator={{ display: 'none' }} // Hide the default indicator
                                    styleRowList={{ borderBottomColor: BaseColor.light, borderBottomWidth: responsiveHeight(0.1), paddingVertical: responsiveHeight(0.5) }}
                                    styleListContainer={styles.searchInput}
                                    styleInputGroup={styles.searchInput}
                                    hideSubmitButton={true}
                                    textInputProps={{ autoFocus: false }}
                                    styleTextDropdown={styles.textDropDown} />

                            </View>


                        </View>
                    </View>




                </View>

                <RegisterButton
                    title="Submit"
                    style={{ textAlign: 'center', marginVertical: responsiveHeight(2) }}
                    textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                    onPress={() => handleSubmit()}
                />

            </ScrollView>

        </View>

    )
}

export default withNetworkCheck(ProfileData)

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.semiBold,
        marginVertical: responsiveHeight(1),
        lineHeight: responsiveFontSize(4),

    },
    inputContainer: {
        marginBottom: 5,
        marginTop: responsiveWidth(5),

    },

    multiSelectDropdown: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: BaseColor.light,
        color: BaseColor.placeholder,
        elevation: 1,
        paddingLeft: responsiveWidth(2),
        fontFamily: Fonts.semiBold,


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

    searchInput: {
        color: BaseColor.light,
        fontSize: responsiveFontSize(1.8),
        paddingVertical: Platform.OS === 'ios' ? responsiveHeight(2) : 0,
        fontFamily: Fonts.semiBold,
        paddingHorizontal: responsiveWidth(1),
        borderWidth: 1,
        borderColor: BaseColor.light,
        borderRadius: 8,
        marginBottom: 5
    },

    selectTextNotSelected: {
        paddingLeft: responsiveWidth(0), // Padding when no item is selected
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(1.8)
    },
    selectTextSelected: {
        paddingLeft: responsiveWidth(3),
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
        fontFamily: Fonts.semiBold,
        fontSize: responsiveFontSize(1.8)
    },
})
