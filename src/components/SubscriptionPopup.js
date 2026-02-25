import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  BackHandler // Add BackHandler import
} from 'react-native';
import { BaseColor, useTheme } from '../config/theme';
import { Fonts } from '../config/styles/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SubscriptionPopup = ({ visible, onClose, onSelectSubscription, loading, plans = [] }) => {
  const { colors } = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle back button press for Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        // onClose();
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  // Transform API plans to component format
  const transformPlans = (apiPlans) => {
    return apiPlans.map(plan => ({
      id: plan.id.toString(),
      title: plan.name,
      // duration: plan.duration_with_label,
      description: `${plan.description} for ${plan.duration_with_label.toLowerCase()}`,
      price: plan.price === 0 ? 'FREE' : `₹${plan.price}`,

      popular: Number(plan.id) === 2, // Mark plan with id 2 as popular, adjust as needed
      originalData: plan // Keep original data for reference

    }));
  };

  const subscriptionOptions = plans.length > 0 ? transformPlans(plans) : [];

  const handleSubscriptionSelect = (option) => {
    setSelectedOption(option.id);
  };

  const handleConfirmSelection = () => {
    if (selectedOption) {
      const selected = subscriptionOptions.find(option => option.id === selectedOption);

      console.log('Selected Option:', selected);


      onSelectSubscription(selected.originalData); // Pass original plan data
      onClose();
    }
  };

  // Add this function to handle overlay press
  const handleOverlayPress = () => {
    onClose();
  };

  const getPlanCardBackgroundColor = (planId) => {
    const id = Number(planId);

    if (id === 1) return '#F1FAF4';
    if (id === 2) return '#F2F7FD';
    if (id === 3) return '#FEF4EC';

    return BaseColor.whiteColor;
  };

  const renderSubscriptionOptions = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={BaseColor.primary} />
          <Text style={styles.loadingText}>Loading plans...</Text>
        </View>
      );
    }

    if (subscriptionOptions.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No subscription plans available</Text>
        </View>
      );
    }

    return (
      <View style={styles.subscriptionContainer}>
        <Text style={styles.subscriptionTitle}>Choose Your Plan</Text>

        {subscriptionOptions.map((option) => (

          <TouchableOpacity
            key={option.id}
            style={[
              styles.subscriptionOption,
              { backgroundColor: getPlanCardBackgroundColor(option.id) },
              option.popular && styles.popularOption,
              selectedOption === option.id && styles.selectedOption
            ]}
            onPress={() => handleSubscriptionSelect(option)}
          >
            {option.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Most Popular</Text>
              </View>
            )}

            <View style={styles.optionHeader}>
              <View style={styles.optionTextContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
                {/* <Text style={styles.optionDuration}>{option.duration}</Text> */}
                {/* <Text style={styles.optionPrice}>{option.price}</Text> */}

              </View>

              <View style={[
                styles.checkmarkContainer,
                selectedOption === option.id && styles.checkmarkContainerSelected
              ]}>
                {selectedOption === option.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedOption && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSelection}
          disabled={!selectedOption}
        >
          <Text style={styles.confirmButtonText}>
            {selectedOption ? 'Continue with Selected Plan' : 'Select a Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        {/* Add overlay press handler */}
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleOverlayPress}
        >
          <View style={styles.modalContent}>
            {/* Prevent modal content from closing when pressing inside */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={{ width: '100%' }}
            >
              <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
                {renderSubscriptionOptions()}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.79)',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4)
  },
  mainContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: responsiveWidth(4),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  subscriptionContainer: {
    // flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveHeight(4),
  },
  loadingText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.regular,
    color: BaseColor.text,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveHeight(4),
  },
  emptyText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.regular,
    color: BaseColor.text,
  },
  subscriptionTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.bold,
    color: BaseColor.primary,
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(1.5)
  },
  subscriptionOption: {
    borderWidth: 2,
    borderColor: BaseColor.light,
    borderRadius: 15,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    position: 'relative',
  },
  popularOption: {
    borderColor: BaseColor.primary,
  },
  selectedOption: {
    borderColor: '#4CAF50',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: BaseColor.primary,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 15,
  },
  popularBadgeText: {
    color: BaseColor.whiteColor,
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.semiBold,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  optionTextContent: {
    flex: 1,
    marginRight: responsiveWidth(2),
  },
  optionTitle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: Fonts.bold,
    color: BaseColor.primary,
    marginBottom: responsiveHeight(0.5),
  },
  optionDuration: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.regular,
    color: BaseColor.gray,
    marginBottom: responsiveHeight(0.5),
  },
  optionPrice: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.bold,
    color: BaseColor.primary,
    marginBottom: responsiveHeight(1),
  },
  optionDescription: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.regular,
    color: BaseColor.black,
  },
  checkmarkContainer: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: responsiveWidth(4),
    borderWidth: 2,
    borderColor: BaseColor.light,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.whiteColor,
  },
  checkmarkContainerSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: BaseColor.whiteColor,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: BaseColor.primary,
    padding: responsiveWidth(4),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  confirmButtonDisabled: {
    backgroundColor: BaseColor.grayColor,
    opacity: 0.6,
  },
  confirmButtonText: {
    color: BaseColor.whiteColor,
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
  },
});

export default SubscriptionPopup;
