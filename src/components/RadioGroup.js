
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import { BaseColor } from '../config/theme';
import Icon from 'react-native-vector-icons/Octicons'; // Ensure you have installed this library
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const RadioButton = ({ selected, onPress, children, sub_title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
            <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center', marginEnd : responsiveWidth(2)}}> 
                <Text style={styles.radioButtonText}>{children}</Text>
                {sub_title && <Text style={styles.radioButtonText_two}>{sub_title}</Text>}
            </View>
            <FontAwesome name='check-square' size={20} color={selected ? BaseColor.yellowColor : BaseColor.grayColor} />
        </TouchableOpacity>
    );
};

const RadioGroup = ({ options, selectedOption, onOptionChange, title, style, visible, sub_title, isEdit }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (visible !== undefined) {
            setIsVisible(visible);
        }
    }, [visible]);

    return (
        <View style={style}>
            {isVisible && (

                <View style={{flexDirection : 'row'}}>
                <Text
                    style={{
                        fontSize: responsiveFontSize(1.6),
                        lineHeight: responsiveFontSize(1.8),
                        fontFamily: Fonts.semiBold,
                        color: BaseColor.black,
                        letterSpacing: 1,
                    }}
                >
                    {title}
                </Text>

                {sub_title && (
                 <Text
                    style={{
                        fontSize: responsiveFontSize(0.8),
                        lineHeight: responsiveFontSize(1.3),
                        fontFamily: Fonts.semiBold,
                        color: BaseColor.black,
                        letterSpacing: 1,
                    }}
                >
                  ({sub_title})
                </Text>
                 )}
                </View>
            )}
            <View style={styles.radioGroupContainer}>
                {options.map((option) => (
                    <RadioButton
                        key={option.value}
                        selected={selectedOption === option.value}
                        onPress={() => {
                            if (isEdit) {
                            onOptionChange(option.value)}}
                        }
                        sub_title={option.sub_title}
                    >
                        {option.label}
                    </RadioButton>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    radioGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      //  marginRight: 15,
        justifyContent: 'flex-start',
        flex: 1,
     //   marginHorizontal: responsiveWidth(1.5),
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioButtonSelected: {
        backgroundColor: '#007AFF',
    },
    radioButtonText: {
        fontSize: responsiveFontSize(1.7),
        fontFamily: Fonts.semiBold,
        color: BaseColor.black,
        lineHeight: responsiveFontSize(2),
        marginTop: responsiveHeight(0.8),
        marginStart: responsiveWidth(1),
    },
    radioButtonText_two: {
        fontSize: responsiveFontSize(0.8),
        fontFamily: Fonts.semiBold,
        color: BaseColor.grayColor,
        lineHeight: responsiveFontSize(1),
        marginTop: responsiveHeight(0.6),
        marginStart: responsiveWidth(1.5),
    },
});

export default RadioGroup;



// import React, { useEffect, useState } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Fonts } from '../config/styles/fonts';
// import { BaseColor } from '../config/theme';
// import Icon from 'react-native-vector-icons/Octicons'; // Ensure you have installed this library

// const RadioButton = ({ selected, onPress, children, sub_title }) => {
//     return (
//         <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
//             <Icon name='check-circle' size={20} color={selected ? BaseColor.yellowColor : BaseColor.grayColor} />
//             <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}> 
//                 <Text style={styles.radioButtonText}>{children}</Text>
//                 {sub_title && <Text style={styles.radioButtonText_two}>{sub_title}</Text>}
//             </View>
//         </TouchableOpacity>
//     );
// };

// const RadioGroup = ({ options, selectedOption, onOptionChange, title, style, visible, sub_title , isEdit }) => {
//     const [isVisible, setIsVisible] = useState(true);

//     useEffect(() => {
//         if (visible !== undefined) {
//             setIsVisible(visible);
//         }
//     }, [visible]);

//     return (
//         <View style={style}>
//             {isVisible && (

//                 <View style={{flexDirection : 'row'}}>
//                 <Text
//                     style={{
//                         fontSize: responsiveFontSize(1.3),
//                         lineHeight: responsiveFontSize(1.5),
//                         fontFamily: Fonts.semiBold,
//                         color: BaseColor.black,
//                         letterSpacing: 1,
//                     }}
//                 >
//                     {title}
//                 </Text>

//                  <Text
//                     style={{
//                         fontSize: responsiveFontSize(0.8),
//                         lineHeight: responsiveFontSize(1.3),
//                         fontFamily: Fonts.semiBold,
//                         color: BaseColor.black,
//                         letterSpacing: 1,
//                     }}
//                 >
//                   ({sub_title})
//                 </Text>
//                 </View>
//             )}
//             <View style={styles.radioGroupContainer}>
//                 {options.map((option) => (
//                     <RadioButton
//                         key={option.value}
//                         selected={selectedOption === option.value}
//                         onPress={() => isEdit == false ? onOptionChange(option.value) : null}
//                         sub_title={option.sub_title}
//                     >
//                         {option.label}
//                     </RadioButton>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     radioGroupContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: responsiveHeight(1),
//     },
//     radioButtonContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 15,
//         justifyContent: 'flex-start',
//         flex: 1,
//         marginHorizontal: responsiveWidth(1.5),
//     },
//     radioButton: {
//         height: 20,
//         width: 20,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 8,
//     },
//     radioButtonSelected: {
//         backgroundColor: '#007AFF',
//     },
//     radioButtonText: {
//         fontSize: responsiveFontSize(2),
//         fontFamily: Fonts.semiBold,
//         color: BaseColor.black,
//         lineHeight: responsiveFontSize(2.3),
//         marginTop: responsiveHeight(0.6),
//         marginStart: responsiveWidth(1.5),
//     },
//     radioButtonText_two: {
//         fontSize: responsiveFontSize(0.8),
//         fontFamily: Fonts.semiBold,
//         color: BaseColor.grayColor,
//         lineHeight: responsiveFontSize(1),
//         marginTop: responsiveHeight(0.6),
//         marginStart: responsiveWidth(1.5),
//     },
// });

// export default RadioGroup;



