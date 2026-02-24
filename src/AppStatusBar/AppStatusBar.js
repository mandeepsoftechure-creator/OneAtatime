import React, { useCallback } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useStatusBar = (style, color) => {
    useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle(style);
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(color);
        }

      }, [])
    );
  };