import { Dimensions, Platform } from 'react-native';

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

export const isIPhoneXOrNewer = () => {
  return Platform.OS === 'ios' && (
    (D_HEIGHT === 812 || D_WIDTH === 812) || // iPhone X, XS
    (D_HEIGHT === 896 || D_WIDTH === 896) || // iPhone XR, XS Max
    (D_HEIGHT === 844 || D_WIDTH === 844) || // iPhone 12, 12 Pro
    (D_HEIGHT === 926 || D_WIDTH === 926) || // iPhone 12 Pro Max
    (D_HEIGHT === 780 || D_WIDTH === 780) || // iPhone 12 Mini
    (D_HEIGHT === 852 || D_WIDTH === 852) || // iPhone 14, 14 Pro
    (D_HEIGHT === 932 || D_WIDTH === 932)    // iPhone 14 Pro Max
  );
};
