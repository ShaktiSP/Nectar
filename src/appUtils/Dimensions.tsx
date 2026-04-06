import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize as fp,
  } from 'react-native-responsive-dimensions';
  import { Dimensions } from 'react-native';
  
  const { width, height } = Dimensions.get('window');
  
  export const SCREEN_WIDTH = width;
  export const SCREEN_HEIGHT = height;
  
  export { hp, wp, fp };