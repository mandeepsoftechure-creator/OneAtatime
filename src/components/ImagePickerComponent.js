import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Modal, Alert, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Replace with your preferred image picker library
import { BaseColor } from '../config/theme';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const ImagePickerComponent = ({ visibleity, onImageSelected, handleCancle }) => {

  const [modalVisible, setModalVisible] = useState(visibleity);

  const cancle = () => {
    handleCancle(false);
  }

  // const requestPermissions = async () => {
  //   const cameraPermission = 
  //     Platform.OS === 'android' 
  //       ? PERMISSIONS.ANDROID.CAMERA 
  //       : PERMISSIONS.IOS.CAMERA;

  //   const storagePermission = 
  //     Platform.OS === 'android' 
  //       ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE 
  //       : PERMISSIONS.IOS.PHOTO_LIBRARY;

  //   const cameraResult = await request(cameraPermission);
  //   const storageResult = await request(storagePermission);

  //   if (
  //     cameraResult !== RESULTS.GRANTED ||
  //     storageResult !== RESULTS.GRANTED
  //   ) {
  //     Alert.alert('Permission Denied', 'Please enable camera and storage permissions in settings.');
  //     return false;
  //   }
  //   return true;
  // };



  const handleOpenCamera = async() => {
   // const hasPermission = await requestPermissions();
   // if (hasPermission) {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      onImageSelected(image);
    }).catch((error) => {
      console.log(error);
    });
  //}
  };

  const handleOpenGallery = async () => {
  //  const hasPermission = await requestPermissions();
   // if (hasPermission) {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      onImageSelected(image); // Pass the selected image back to the parent component
    }).catch((error) => {
      console.log(error);
    });
 // }
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1 }}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{
            backgroundColor: BaseColor.transparent, justifyContent: 'center', flex: 1
          }}>

            <View style={{
              backgroundColor: BaseColor.whiteColor, borderRadius: 10, elevation: 4,
              paddingHorizontal: 20, marginHorizontal: 20,
              shadowColor: BaseColor.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <Text style={{ fontSize: 14, color: BaseColor.black, marginTop: 20 }}>Select Image</Text>

              <TouchableOpacity onPress={() => { setModalVisible(!modalVisible), handleOpenCamera() }}>
                <Text style={{ fontSize: 16, color: BaseColor.black, marginTop: 20 }}>Take Photo..</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setModalVisible(!modalVisible), handleOpenGallery() }}>
                <Text style={{ fontSize: 16, color: BaseColor.black, marginTop: 15 }}>Choose Form Library..</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => { setModalVisible(false), cancle() }}>
                <Text style={{ fontSize: 14, color: BaseColor.black, textAlign: 'right', marginVertical: 20, marginEnd: 10 }}>Cancel</Text>
              </TouchableOpacity>


            </View>

          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default ImagePickerComponent;
