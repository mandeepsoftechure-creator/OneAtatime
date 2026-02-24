import { useColorScheme } from 'react-native';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  primary : '#4B6883',
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: 'white',
  fieldColor: '#F5F5F5',
  yellowColor: '#FFA500',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#3BA935',
  pinkLightColor: '#FF5E80',
  pinkDarkColor: '#F90030',
  accentColor: '#4A90A4',
  light : '#ddd',
  app_background : '#F6F9FF',
  black : '#000000',
  red : '#FF0000',
  placeholder : '#a9a9a9',
  gray_new : '#b5b5b5',
  plum : '#8E2B8D',
  charcol : '#636363',
  PondarBackground : '#F0E2C3',
  Faqbackground : '#F2EAE0',

  
};

export const DefaultTheme = {
  theme: 'pink',
  light: {
    dark: false,
    colors: {
      primary_new : "#4B6883",
      primary: '#FF2D55',
      primaryDark: '#F90030',
      primaryLight: '#FF5E80',
      accent: '#4A90A4',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
      image_color: '#000000',
      text_color: '#000000',
      text_light : '#ddd',
      grayColor : '#808080',
      app_background: '#F6F9FF',
      light : '#FFFFFF',
      placeholder : '#a9a9a9',

    },
  },
  dark: {
    dark: true,
    colors: {
      // primary_new : "#000000",
      // primary: '#000000',
      // primaryDark: '#F90030',
      // primaryLight: '#FF5E80',
      // accent: '#4A90A4',
      // background: '#404040',
      // background: '#404040',
      // card: '#121212',
      // text: '#e5e5e7',
      // border: '#272729',
      // image_color: '#FFFFFF',
      // text_color: '#FFFFFF',
      // text_light : '#ddd',
      // grayColor : '#808080',
      // app_background: '#404040',
      // light : '#ddd',


      primary_new : "#4B6883",
      primary: '#FF2D55',
      primaryDark: '#F90030',
      primaryLight: '#FF5E80',
      accent: '#4A90A4',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
      image_color: '#000000',
      text_color: '#000000',
      text_light : '#ddd',
      grayColor : '#808080',
      app_background: '#F6F9FF',
      light : '#FFFFFF',
      placeholder : '#a9a9a9',

    },
  },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = ['ProximaNova', 'Raleway', 'Roboto', 'Merriweather'];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'ProximaNova';

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
//   const forceDark = useSelector((state) => state.application.force_dark);
//   const themeStorage = useSelector((state) => state.application.theme);
//   const listTheme = ThemeSupport.filter((item) => item.theme === themeStorage);
//   const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;
    

//   if (forceDark) {
//     return { theme: theme.dark, colors: theme.dark.colors };
//   }
//   if (forceDark === false) {
//     return { theme: theme.light, colors: theme.light.colors };
//   }
//   return isDarkMode
//     ? { theme: theme.dark, colors: theme.dark.colors }
//     : { theme: theme.light, colors: theme.light.colors };


const defaultTheme = isDarkMode ? DefaultTheme.dark : DefaultTheme.light;

return { theme: defaultTheme, colors: defaultTheme.colors };


};

/**
 * export font for application
 * @returns font
 */

