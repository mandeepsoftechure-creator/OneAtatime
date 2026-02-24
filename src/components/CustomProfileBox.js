import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BaseColor, useTheme } from '../config/theme'
import Icon from 'react-native-vector-icons/AntDesign'; // Assuming you're using AntDesign icons
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';

const CustomProfileBox = ({ title, text_title_first, text_title_second, style, firt_Onpress, second_Onpress, thired_Onpress,
    text_title_thired, visibile, fourth_Onpress, text_title_fourth
}) => {

    const { colors } = useTheme();

    return (
        <View style={style}>
            <Text style={[styles.sectionTitle, { color: colors.text_color }]}>{title}</Text>

            <View style={{
                backgroundColor: colors.light,
                borderRadius: 15,
                elevation: 1,
                marginTop: responsiveHeight(1),
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(2),
                shadowOffset: { width: 1, height: 0 }, 
                shadowOpacity: 0.2,     
                shadowRadius: 2,     
         
             
            }}>

                <TouchableOpacity style={styles.item} onPress={firt_Onpress}>
                    <Text style={styles.itemText}>{text_title_first}</Text>
                    <Icon
                        name='right'
                        size={15}
                        color={BaseColor.black}
                    />
                </TouchableOpacity>

                <View style={{
                    height: responsiveHeight(0.1), backgroundColor: BaseColor.light, marginHorizontal: responsiveWidth(0)
                    , marginVertical: responsiveHeight(1)
                }}></View>

                <TouchableOpacity style={styles.item} onPress={second_Onpress}>
                    <Text style={styles.itemText}>{text_title_second}</Text>
                    <Icon
                        name='right'
                        size={15}
                        color={BaseColor.black}
                    />
                </TouchableOpacity>

                {visibile &&

                    <View style={{marginTop : 5}}>

                        <View style={{
                            height: responsiveHeight(0.1), backgroundColor: BaseColor.light, marginHorizontal: responsiveWidth(1)
                            , marginVertical: responsiveHeight(1)
                        }}></View>

                        <TouchableOpacity style={styles.item} onPress={thired_Onpress}>
                            <Text style={styles.itemText}>{text_title_thired}</Text>
                            <Icon
                                name='right'
                                size={15}
                                color={BaseColor.black}
                            />
                        </TouchableOpacity>


                        {/* <View style={{
                            height: responsiveHeight(0.1), backgroundColor: BaseColor.light, marginHorizontal: responsiveWidth(1)
                            , marginVertical: responsiveHeight(1)
                        }}></View>

                        <TouchableOpacity style={styles.item} onPress={fourth_Onpress}>
                            <Text style={styles.itemText}>{text_title_fourth}</Text>
                            <Icon
                                name='right'
                                size={15}
                                color={BaseColor.black}
                            />
                        </TouchableOpacity> */}


                    </View>



                }

                


            </View>
        </View>
    )
}

export default CustomProfileBox

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: responsiveFontSize(1.6),
        lineHeight: responsiveFontSize(1.8),
        fontFamily: Fonts.semiBold,
      
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop : 5
    },

    itemText: {
        fontSize: responsiveFontSize(2),
        lineHeight: responsiveFontSize(2.5),
        fontFamily: Fonts.semiBold,
        color: BaseColor.black,
        flex: 1

    },
})