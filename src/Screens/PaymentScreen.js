import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { BaseColor, useTheme } from '../config/theme';
import { Fonts } from '../config/styles/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const PaymentScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { 
    subscription, 
    paymentUrl,
    onPaymentSuccess,
    onPaymentFailure 
  } = route.params;
  
  const [loading, setLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(1);
  const [hasProcessedResult, setHasProcessedResult] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Cancel Payment?',
        'Are you sure you want to cancel this payment?',
        [
          {
            text: 'Continue Payment',
            style: 'cancel',
          },
          {
            text: 'Cancel Payment',
            onPress: () => {
              handlePaymentFailure('Payment cancelled by user');
            },
          },
        ]
      );
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handlePaymentSuccess = () => {
    if (hasProcessedResult) return;
    
    console.log('Payment successful!');
    setLoading(false);
    setHasProcessedResult(true);
    
    // Call the success callback if provided
    if (onPaymentSuccess) {
      onPaymentSuccess();
    }
    
    Alert.alert(
      'Payment Successful! 🎉',
      `Thank you for purchasing ${subscription?.title || 'the subscription'}`,
      [
        {
          text: 'Continue',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { onDismiss: () => navigation.goBack() }
    );
  };

  const handlePaymentFailure = (errorMessage = 'Payment failed') => {
    if (hasProcessedResult) return;
    
    console.log('Payment failed:', errorMessage);
    setLoading(false);
    setHasProcessedResult(true);
    
    // Call the failure callback if provided
    if (onPaymentFailure) {
      onPaymentFailure(errorMessage);
    }
    
     navigation.goBack();
  };

  const handleNavigationStateChange = (navState) => {
    const { url, title, loading } = navState;
    
    console.log('Navigation state changed:', { url, title, loading });
    setLoading(loading);

    // Auto-detect Transaction Result page and go back
    if (!loading && title === "Transaction Result" && !hasProcessedResult) {
      console.log('Transaction Result page loaded completely, processing payment result...');
      setHasProcessedResult(true);
      
      // Extract order_id from URL for verification
      let orderId = null;
      if (url.includes('order_id=')) {
        try {
          const urlObj = new URL(url);
          orderId = urlObj.searchParams.get('order_id');
          console.log('Extracted Order ID:', orderId);
        } catch (error) {
          console.log('Error parsing URL:', error);
        }
      }
      
      // Since we're on the return URL, check for success indicators
      if (url.includes('status=success') || 
          !url.includes('status=failure') && 
          !url.includes('status=cancelled')) {
        // Assume success if no failure indicators are present
        setTimeout(() => {
          handlePaymentSuccess();
        }, 1500);
      } else {
        setTimeout(() => {
          handlePaymentFailure('Payment was not successful');
        }, 1500);
      }
      return;
    }

    // Traditional URL pattern matching
    if (url && !hasProcessedResult) {
      // Success URL patterns for Cashfree
      if (url.includes('/success') || 
          url.includes('/return?status=success') || 
          url.includes('payment/success') ||
          url.includes('transaction=success') ||
          title?.toLowerCase().includes('success') ||
          url.includes('status=success')) {
        handlePaymentSuccess();
      }
      
      // Failure URL patterns for Cashfree
      else if (url.includes('/failure') || 
               url.includes('/cancel') || 
               url.includes('/return?status=failure') ||
               url.includes('payment/failed') ||
               url.includes('transaction=failed') ||
               url.includes('status=failed') ||
               title?.toLowerCase().includes('failure') ||
               title?.toLowerCase().includes('cancelled')) {
        handlePaymentFailure('Payment was cancelled or failed');
      }
    }
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView error:', nativeEvent);
    if (!hasProcessedResult) {
      handlePaymentFailure('Network error occurred');
    }
  };

  const reloadWebView = () => {
    setHasProcessedResult(false);
    setWebViewKey(prev => prev + 1);
    setLoading(true);
  };

  if (!paymentUrl) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Payment URL not available</Text>
          <Text style={styles.errorSubText}>
            Please try again or contact support if the problem persists.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Payment</Text>
        <Text style={styles.headerSubtitle}>
          {subscription?.title || 'Yearly Subscription'}
        </Text>
        <Text style={styles.headerPrice}>
          {subscription?.price || '₹365/year'}
        </Text>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={BaseColor.primary} />
          <Text style={styles.loadingText}>Loading payment gateway...</Text>
        </View>
      )}

      {/* WebView */}
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          key={webViewKey}
          source={{ uri: paymentUrl }}
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleWebViewError}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('HTTP error:', nativeEvent);
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoading}>
              <ActivityIndicator size="large" color={BaseColor.primary} />
              <Text style={styles.webViewLoadingText}>
                Loading secure payment page...
              </Text>
            </View>
          )}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
        />
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={reloadWebView}
          disabled={loading}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handlePaymentFailure('Payment cancelled by user')}>
          <Text style={styles.cancelButtonText}>Cancel Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.lightGray,
    backgroundColor: BaseColor.whiteColor,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.bold,
    color: BaseColor.charcol,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
    color: BaseColor.primary,
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  headerPrice: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.gray,
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.regular,
    color: BaseColor.charcol,
    marginTop: responsiveHeight(2),
    textAlign: 'center',
  },
  webViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColor.whiteColor,
  },
  webViewLoadingText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.gray,
    marginTop: responsiveHeight(1),
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 1,
    borderTopColor: BaseColor.lightGray,
    backgroundColor: BaseColor.whiteColor,
  },
  reloadButton: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
    borderWidth: 1,
    borderColor: BaseColor.primary,
    borderRadius: 6,
  },
  reloadButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.primary,
  },
  cancelButton: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
    backgroundColor: BaseColor.redColor,
    borderRadius: 6,
  },
  cancelButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.whiteColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(8),
  },
  errorText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.bold,
    color: BaseColor.redColor,
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
  },
  errorSubText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.gray,
    textAlign: 'center',
    lineHeight: responsiveFontSize(2.2),
    marginBottom: responsiveHeight(4),
  },
  retryButton: {
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: BaseColor.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
    color: BaseColor.whiteColor,
  },
});

export default PaymentScreen;