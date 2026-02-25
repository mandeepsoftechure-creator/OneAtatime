import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomHeaderLogin from '../components/CustomHeaderLogin';
import Loader from '../components/Loader';
import { BaseStyle } from '../config/styles/BaseStyle';
import { BaseColor, useTheme } from '../config/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import { clearNotificationAll, getNotification } from '../Api/auth';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = ({ navigation }) => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleNotification = async () => {
      setLoading(true); // Start loading indicator
      setError(null); // Reset error state
      try {
        const data = await getNotification(); // Assume this is your API function
        if (data.status) {
          setNotifications(data.data || []); // Update state with fetched notifications
        } else {
          setError('Failed to fetch notifications.');
        }
      } catch (error) {
        setError('An error occurred while fetching notifications.');
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    handleNotification();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const clearNotification = async () => {
    setLoading(true); // Start loading indicator
    setError(null); // Reset error state
    try {
      const data = await clearNotificationAll(); // Assume this is your API function
      console.log(data)
      if (data.status) {
        setNotifications([]); // Update state with fetched notifications
        Toast.show(data.message, Toast.LONG);

      } else {
        setError('Failed to fetch notifications.');
      }
    } catch (error) {
      setError('An error occurred while fetching notifications.');
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };


  const handleClearNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearNotification()
          },
        },
      ]
    );
  };


  const renderNotification = ({ item }) => (
    console.log(item),
    <View style={styles.notificationCard}>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.message}</Text>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="notifications-off" size={50} color={BaseColor.primary} />
      <Text style={styles.noNotificationsText}>Nothing to see here</Text>
    </View>
  );

  return (
    <View style={[BaseStyle.safeAreaView, { backgroundColor: colors.app_background }]}>
      <CustomHeaderLogin icon_name='left' title="Notification" onBackPress={handleBackPress}
        clear={handleClearNotifications}
        notificaiton={true} />
      <Loader visible={loading}></Loader>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
      />

    </View>

  );
};

const styles = StyleSheet.create({

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginHorizontal: responsiveWidth(5),
    elevation: 2,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  listContainer: {
    marginTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1.5),
  },

  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
    color: BaseColor.black,
    lineHeight: responsiveFontSize(2.5)

  },
  notificationDescription: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.black,
    lineHeight: responsiveFontSize(2.5)
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(12),
  },
  noNotificationsText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
    color: BaseColor.primary,
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
});

export default NotificationScreen;
