import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../config/styles/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { BaseColor, useTheme } from '../config/theme';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const ListItemExploreNew = ({ question, answer, cardBackgroundColor }) => {
  const { colors } = useTheme();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { width } = useWindowDimensions();

  const toggleAnswer = () => {
    setIsAnswerVisible(prev => !prev);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.card,
          { backgroundColor: cardBackgroundColor || colors.light, borderColor: BaseColor.light },
        ]}
      >
        
        <TouchableOpacity
          onPress={toggleAnswer}
          activeOpacity={0.8}
          style={styles.itemContainer}
        >
          <Text
            style={styles.itemText}
            numberOfLines={isAnswerVisible ? undefined : 1}
            ellipsizeMode="tail"
          >
            {question}
          </Text>

          <Icon
            name={isAnswerVisible ? 'up' : 'down'}
            size={17}
            color={BaseColor.black}
          />
        </TouchableOpacity>

        {/* ✅ ANSWER */}
        {isAnswerVisible && (
          <RenderHtml
            contentWidth={width}
            source={{ html: answer }}
            baseStyle={styles.answerText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: responsiveHeight(1),
  },
  card: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2.3),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveFontSize(2.6),
    color: BaseColor.primary,
    marginRight: 10,
  },
  answerText: {
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveFontSize(2),
    color: BaseColor.black,
    paddingTop: responsiveHeight(1),
  },
});

export default ListItemExploreNew;
