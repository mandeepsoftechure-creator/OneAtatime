import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../assets/images/images";
import { BaseColor, useTheme } from "../config/theme";

export const ErrorCard = () => {
    const {colors} = useTheme();

    return (
      <View style={[styles.errorContainer, {backgroundColor : colors.background}]}>
        <View>
          <Image source={Images.error} style={styles.img} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.errorHead, {color : colors.text_color}]}>Connection Error</Text>
          <Text style={[styles.subText, {color : colors.text_color}]}>
            Please check your network connectivity and try again
          </Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({

    errorContainer: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 30,
      justifyContent: 'center',
     
    },
    rootContainer: {justifyContent: 'flex-start', padding: 10},
    img: {height: 120, width: 120},
    textContainer: {
      alignItems: 'center',
    },
    title: {marginBottom: 10, fontSize: 20, fontWeight: 'bold'},
    errorHead: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 16,
      fontWeight: '500',
      paddingHorizontal: 50,
      textAlign: 'center',
    },
  });