import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isSmallScreen = width / height >= 0.56;
