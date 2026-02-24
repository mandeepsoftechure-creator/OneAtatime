// module.exports = {
//     project : {
//         ios : {},
//         android : {}
//     },
//     assets : ["./src/assets/fonts"]
// },

// module.exports = {
//     dependencies: {
//       'react-native-vector-icons': {
//         platforms: {
//           ios: null,
//         },
//       },
//     },
//   };

module.exports = {
  project: {
    ios: {}, // Add any iOS project-specific configurations here
    android: {}, // Add any Android project-specific configurations here
  },
  assets: ["./src/assets/fonts"], // Specify the directory where your font assets are located

  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Ensure react-native-vector-icons is not linked specifically for iOS
      },
    },
  },
};

