import { ActivityIndicator, Alert, Image, ImageBackground, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseStyle } from '../config/styles/BaseStyle'
import Images from '../assets/images/images'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { BaseColor, useTheme } from '../config/theme'
import { Fonts } from '../config/styles/fonts'
import Icon from 'react-native-vector-icons/AntDesign'; // Assuming you're using AntDesign icons
import CustomProfileBox from '../components/CustomProfileBox'
import navigationString from '../constant/navigationString'
import { useUserData } from '../context/UserDataContext'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIPhoneXOrNewer } from '../constant/deviceUtils'
import IconEdit from 'react-native-vector-icons/dist/Feather';
import ImagePickerComponent from '../components/ImagePickerComponent'
import Loader from '../components/Loader'
import { deleteUser, updateProfile, updateProfileImage } from '../Api/user'
import Toast from 'react-native-simple-toast';
import withNetworkCheck from '../Utils/withNetworkCheck'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import DeleteUserModal from '../components/DeleteUserModal'

const Profile = ({ navigation }) => {

  const statusBarHeight = getStatusBarHeight();
  const { colors } = useTheme();
  const { userData, saveUserData } = useUserData();
  const [image, setImage] = useState();
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);


  console.log('User Data in Profile Screen:', image);

  useEffect(() => {
    console.log(userData.user.profile_pic_url)
    setImage(userData.user.profile_pic_url)
  }, [])


  const handleDeleteAccount = async () => {
  setDeleteModalVisible(false);

  try {
    setLoading(true);

    const userId = userData?.user?.id; 
    console.log('userId:', userId);
    

    if (!userId) {
      Toast.show('User not found', Toast.LONG);
      return;
    }

    const response = await deleteUser(userId);

    if (response?.status) {
      Toast.show(response.message || 'Account deleted successfully', Toast.LONG);

      await AsyncStorage.clear();
      navigation.replace(navigationString.Login);
    } else {
      Toast.show(response.message || 'Failed to delete account', Toast.LONG);
    }

  } catch (error) {
    console.log('Delete error:', error);
    Toast.show('Something went wrong', Toast.LONG);
  } finally {
    setLoading(false);
  }
};





  const handleSubmit = async (image) => {
    if (!image) {
      Toast.show('Please select image', Toast.LONG);
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('profile_pic', {
          uri: image.path,
          name: image.filename || 'photo.jpg',
          type: image.mime || 'image/jpeg',
        });

        console.log(formData)
        const response = await updateProfileImage(formData);
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

  const handleLogout = async () => {
    // Show confirmation alert
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            // Clear user data from AsyncStorage
            await AsyncStorage.clear();
            // Navigate to login screen
            navigation.replace(navigationString.Login); // Replace with your login screen name
          }
        }
      ]
    );
  };

  const handleImagePicker = (selectedImage) => {

    console.log(selectedImage)
    // Function to handle image selection from ImagePickerComponent
    setImage(selectedImage.path);
    setClick(false);
    console.log(selectedImage.path, 'vvvvvvvv')
    handleSubmit(selectedImage);
    // Set the selected image path
  };

  console.log(userData)

  return (

    <SafeAreaView style={[BaseStyle.safeAreaView, {
      backgroundColor: colors.background,
    }]}>

      <Loader visible={loading}></Loader>

      <TouchableOpacity
        style={{
          // position: 'absolute',
          top: Platform.OS === 'ios' ? 10 : 10,
          left: 15,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="left" size={22} color={colors.text_color} />
      </TouchableOpacity>

      <View style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? (isIPhoneXOrNewer() ? 0 : statusBarHeight) : responsiveHeight(3.5),
        paddingBottom: responsiveHeight(2.5)
      }}>

        {/* <View style={{justifyContent : 'center', alignItems : 'center'}}>
    <Image source={Images.image_splash_logo}
          style={styles.image}/>
      <Text style={{fontSize : responsiveScreenFontSize(2.8), 
        fontFamily : Fonts.semiBold, color : BaseColor.black, 
        lineHeight : responsiveScreenFontSize(3),
        marginTop : responsiveHeight(1),
      }}>Jhon Wick</Text> 
    </View> */}

        <View style={styles.profileContainer}>



          <ImageBackground
            style={styles.imageBackground}
            source={image ? { uri: image } : Images.profile_image} // Use selected image if available, otherwise default image
            imageStyle={styles.imageStyle}
            resizeMode='stretch'
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          >
            {imageLoading && <ActivityIndicator size="small" color={BaseColor.primaryColor} />}

            <TouchableOpacity onPress={() => setClick(!click)} style={styles.iconEdit}>
              <IconEdit name={'edit'} size={20} color={colors.text_color} />
            </TouchableOpacity>
          </ImageBackground>

          <Text style={[styles.name, { color: colors.text_color }]}>{userData ? userData?.user.name : 'John Doe'}</Text>
        </View>

        <View style={{ height: responsiveHeight(0.1), backgroundColor: BaseColor.light, }}></View>


        <View style={styles.container}>
          <CustomProfileBox
            firt_Onpress={() => navigation.navigate(navigationString.General)}
            second_Onpress={() => navigation.navigate(navigationString.Occupation)}
            thired_Onpress={() => navigation.navigate(navigationString.History)}
            title={'PERSONAL'}
            text_title_first={'General'}
            text_title_second={'Lifestyle'}
            visibile={true}
            text_title_thired={'History'}
          ></CustomProfileBox>

          <CustomProfileBox
            firt_Onpress={() => navigation.navigate(navigationString.HealthChallenges)}
            second_Onpress={() => navigation.navigate(navigationString.PastDiesease)}
            thired_Onpress={() => navigation.navigate(navigationString.Familyillnesses)}
            // fourth_Onpress={()=>navigation.navigate(navigationString.Occupation)}
            style={{ marginTop: responsiveHeight(2) }} title={'HEALTH'}
            text_title_first={'Health Challenges'}
            text_title_second={'Past Disease'}
            visibile={true}
            text_title_thired={'Family Illnesses'}
          // text_title_fourth={'Occupation'}
          ></CustomProfileBox>


          {/* <Text style={[styles.sectionTitle, { color: colors.text_color}]}>{'Logout'}</Text> */}

          <View style={{
            backgroundColor: colors.light,
            borderRadius: 15,
            elevation: 1,
            marginTop: responsiveHeight(3),
            paddingHorizontal: responsiveWidth(4),
            paddingVertical: responsiveHeight(2),
            shadowOffset: { width: 1, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 2,

          }}>

            <TouchableOpacity style={styles.item} onPress={() => { handleLogout() }}>
              <Text style={styles.itemText}>{'Logout'}</Text>
              <Icon
                name='right'
                size={15}
                color={BaseColor.black}
              />
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.item, { marginTop: responsiveHeight(2) }]}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Text style={[styles.itemText, { color: '#E53935' }]}>
                Delete Account
              </Text>
            </TouchableOpacity>




          </View>

          <Text style={styles.note}>Your data is encrypted on your device and can only be shared with your permission.</Text>
          {/* <Text style={styles.link}>Learn more about Health & Privacy...</Text> */}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL('https://drdeepaktibrewal.com/privacy-policy.html')
            }
          >
            Privacy Policy
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL('https://drdeepaktibrewal.com/Terms.html')
            }
          >
            Terms & Conditions
          </Text>

        </View>

        <DeleteUserModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAccount}
          animationType="fade"
        />
      </View>

      {click == true ? <ImagePickerComponent onImageSelected={handleImagePicker} handleCancle={() => setClick(false)}
      /> : null}



    </SafeAreaView>
  )
}

export default withNetworkCheck(Profile)

const styles = StyleSheet.create({

  sectionTitle: {
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(1.5),
    fontFamily: Fonts.semiBold,

  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemText: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.3),
    fontFamily: Fonts.semiBold,
    color: BaseColor.black,
    flex: 1

  },



  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    resizeMode: 'cover',
    marginTop: responsiveHeight(5),


  },

  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2.5)
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(1)
  },

  name: {
    marginTop: 8,
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.semiBold,
    lineHeight: responsiveFontSize(2.8),
    letterSpacing: 0,

  },
  section: {
    marginVertical: 10,
  },

  note: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveFontSize(1.7),
    fontFamily: Fonts.semiBold
    //textAlign: 'center',
  },
  link: {
    marginTop: responsiveHeight(1),
    fontSize: 12,
    color: '#007AFF',
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(1.6),

    fontFamily: Fonts.semiBold
    // textAlign: 'center',
  },

  imageBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,

  },
  iconEdit: {
    position: 'absolute',
    bottom: 5, // Adjust as needed to position the icon
    right: 5, // Adjust as needed to position the icon

  },

})