import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BaseStyle } from '../config/styles/BaseStyle';
import { BaseColor, FontSupport, useTheme } from '../config/theme';
import CustomHeaderLogin from '../components/CustomHeaderLogin';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import RadioGroup from '../components/RadioGroup';
import RegisterButton from '../components/RegisterButton';
import Toast from 'react-native-simple-toast';
import { savePersonalDetails } from '../Api/auth';
import Loader from '../components/Loader';
import { setUserData } from '../Data/asyncStorage';
import navigationString from '../constant/navigationString';
import { getProfile, updateProfile } from '../Api/user';
import { useUserData } from '../context/UserDataContext';
import withNetworkCheck from '../Utils/withNetworkCheck';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const History = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [personal_details, setPersonal_Details] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { userData, saveUserData } = useUserData();
    const {colors} = useTheme();

    const [finalData, setFinalData] = useState({});

    useEffect(() => {

        console.log(finalData)
        // const initialData = {};
        // personal_details.forEach(item => {
        //     initialData[item.id] = "No"; // Set all values to "No"
        // });
        // setFinalData(initialData);
    }, []);

    console.log(userData)

    const handleBackPress = () => {
        navigation.goBack();
    };

    // const handleSelection = (name) => {
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
    

    // const handleOptionChange = (id, value) => {
    //     setSelectedOptions((prev) => ({
    //         ...prev,
    //         [id]: value,
    //     }));
    // };

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const profileData = await getProfile();
                if (profileData.status) {
                    console.log(profileData)
                    setPersonal_Details(profileData.personal_details_options.personal_history);
                    setFinalData(profileData.user.personal_history_ids);

                  const personalHistoryIds = profileData.user.personal_history_ids;

                  // Initialize selected options array
                  const selectedOptionsArray = [];
  
                  // Loop through personal_history and match with personal_history_ids
                  profileData.personal_details_options.personal_history.forEach(item => {
                      if (personalHistoryIds[item.id] === "Yes") {
                          selectedOptionsArray.push(item.name); // Add the name if the id is "Yes"
                      }
                  });
  
                  // Set selected options
                  setSelectedOptions(selectedOptionsArray);
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
        if (!selectedOptions.length > 0) {
            Toast.show('Please Select Personal History', Toast.LONG);
        } else {
            try {
                setLoading(true);
                console.log('fjsfjsfj=============', finalData)
                const data = {
                    personal_history: finalData
                };

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

   
    return (
        <View style={[BaseStyle.safeAreaView, { backgroundColor: colors.app_background }]}>
            <CustomHeaderLogin icon_name='left' title="History" onBackPress={handleBackPress} />
            <Loader visible={loading}></Loader>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveWidth(5) }}>
                <View>
                    <Text style={[styles.sectionTitle, { marginTop: responsiveHeight(1), color : colors.text_color }]}>Personal History</Text>
                    <View style={[styles.card, {backgroundColor : colors.light}]}>


                    <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginVertical : 16,  flex: 1,  }}
                        >

                            {personal_details && personal_details.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleSelection(item.name, item.id)}
                                    style={{ 
                                        flex: 1,  
                                        justifyContent: 'center',  // Vertically center the contents
                                        alignItems: 'center',
                                     }}
                                >
                                   <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, 
                                  }}>

                                    <Text style={{
                                        fontSize: responsiveFontSize(1.8),
                                        lineHeight: responsiveFontSize(2.3),
                                        fontFamily: Fonts.semiBold,
                                        color: BaseColor.placeholder,
                                        letterSpacing: 0.6,
                                       // flex: 1,
                                        
                                    }}>{item.name}</Text>
                                   
                                    <FontAwesome
                                        name={selectedOptions.includes(item.name) ? 'check-square' : 'square-o'} 
                                        size={20}
                                        color={selectedOptions.includes(item.name) ? BaseColor.primary : BaseColor.grayColor}
                                        style={{ paddingLeft : 8 }} // You can adjust the margin for spacing if needed
                                    />
                                    </View>


                                </TouchableOpacity>
                            ))}
                   </ScrollView>

                        {/* {personal_details && personal_details.map((item) => (
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
                                    isEdit={true}
                                />
                            </View>
                        ))} */}
                    </View>
                </View>
              
            </ScrollView>

            <RegisterButton
                    title="Update"
                    style={{ textAlign: 'center', marginVertical: responsiveHeight(2) , marginHorizontal : responsiveWidth(5)}}
                    textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                    onPress={handleSubmit}
                />
        </View>
    );
};

export default withNetworkCheck(History);

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.semiBold,
        marginVertical: responsiveHeight(1),
        lineHeight: responsiveFontSize(4),
    },
    card: {
       // paddingHorizontal: responsiveWidth(2),
        borderRadius: 8,
    },
    radioGroup: {
        marginVertical: responsiveHeight(1),
    },
    groupContainer: {
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(1),
    },
});
