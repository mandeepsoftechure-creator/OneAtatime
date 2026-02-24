import { SafeAreaView, StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BaseStyle } from '../config/styles/BaseStyle';
import { BaseColor, FontSupport, useTheme } from '../config/theme';
import CustomHeaderLogin from '../components/CustomHeaderLogin';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import CustomEditText from '../components/CustomEditText';
import RadioGroup from '../components/RadioGroup';
import CustomEditTextHeight from '../components/CustomEditTextHeight';
import RegisterButton from '../components/RegisterButton';
import Toast from 'react-native-simple-toast';
import Loader from '../components/Loader';
import { setUserData } from '../Data/asyncStorage';
import navigationString from '../constant/navigationString';
import { useUserData } from '../context/UserDataContext';
import { updateProfile } from '../Api/user';
import withNetworkCheck from '../Utils/withNetworkCheck';
import RadioGroupGender from '../components/RadioGroupGender';

const General = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const { userData, saveUserData } = useUserData();
    const {colors} = useTheme();

    console.log(userData)

    useEffect(() => {
        if (userData?.user) {
            setName(userData.user.name || '');
            setAge(userData.user.age || '');
            setHeight(userData.user.height.toString() || '');
            setWeight(userData.user.weight.toString() || '');
            setSex(userData.user.sex !== undefined ? userData.user.sex.toString() : '');
        }
    }, [userData]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSubmit = async () => {
        if (!height) {
            Toast.show('Please select height', Toast.LONG);
        } else if (!weight) {
            Toast.show('Please select weight', Toast.LONG);
        } else {
            try {
                setLoading(true);
                const data = {
                    name,
                    age,
                    sex,
                    height,
                    weight,
                };

                console.log(data)

                const response = await updateProfile(data);
                console.log(response)
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
            <CustomHeaderLogin icon_name='left' title="General" onBackPress={handleBackPress} />
            <Loader visible={loading}></Loader>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: responsiveWidth(5) }}>
                <View>
                    <Text style={[styles.sectionTitle, { color: colors.text_color}]}>Personal Details</Text>
                    <View style={[styles.card, {backgroundColor : colors.light}]}>
                        <CustomEditText 
                            text_name={'Name'}
                            main_style={{ paddingHorizontal: responsiveHeight(0.5), paddingTop: responsiveHeight(1) }}
                            style_view={{ backgroundColor: BaseColor.light }}
                            placeholder={'Enter...'}
                            onTextChange={setName}
                            isEditable={false}
                            text_input={name}
                            text_style={{color : BaseColor.black}}
                            input_style={{color : BaseColor.black}}
                        />
                        <CustomEditText 
                            text_name={'Age'}
                            main_style={{ paddingHorizontal: responsiveHeight(0.5), paddingTop: responsiveHeight(1) }}
                            style_view={{ backgroundColor: BaseColor.light }}
                            placeholder={'dd/mm/yyyy'}
                            onTextChange={setAge}
                            isEditable={false}
                            text_input={age}
                            text_style={{color : BaseColor.black}}
                            input_style={{color : BaseColor.black}}
                        />
                        <View style={{ marginTop: responsiveWidth(4), paddingHorizontal: responsiveHeight(0.5) }}>
                            <RadioGroupGender
                                title={'Gender'}
                                options={[
                                    { label: 'Male', value: '1' },
                                    { label: 'Female', value: '0' },
                                    { label: 'Other', value: '2' },
                                ]}
                               selectedOption={sex}
                               onOptionChange={setSex}
                               isEdit={false}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <CustomEditTextHeight
                                title={'Height'}
                                value={height}
                                onChangeText={setHeight}
                                placeholder={'Enter...'}
                                text={'cm'}
                                maxLength={3}
                            />
                            <CustomEditTextHeight
                                title={'Weight'}
                                style={{ marginTop: responsiveHeight(2) }}
                                value={weight}
                                onChangeText={setWeight}
                                placeholder={'Enter...'}
                                text={'kg'}
                                maxLength={3}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <RegisterButton
                title="Update"
                style={{ textAlign: 'center', marginHorizontal: responsiveWidth(3), marginBottom: responsiveHeight(2) }}
                textStyle={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}
                onPress={handleSubmit}
            />
        </View>
    );
};

export default withNetworkCheck(General);

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.semiBold,
        marginVertical: responsiveHeight(1),
        lineHeight: responsiveFontSize(4),
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
       // backgroundColor: BaseColor.whiteColor,
        paddingHorizontal: responsiveWidth(2),
        borderRadius: 8,
    },
    radioGroup: {
        marginVertical: responsiveHeight(1),
    },
    groupContainer: {
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(1),
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
        marginBottom: 5,
    },
    selectTextNotSelected: {
        paddingLeft: responsiveWidth(0), // Padding when no item is selected
    },
    selectTextSelected: {
        paddingLeft: responsiveWidth(3),
    },
});
