import React from 'react';
import { Alert, Platform } from 'react-native';

export default function BasicAlert({ title, message, confirmText, onConfirm, onClose }) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => {
          if (onClose) {
            onClose();
          }
        },
        style: "cancel",
      },
      {
        text: confirmText,
        onPress: () => {
          onConfirm();
          if (onClose) {
            onClose();
          }
        },
        style: "default",
      },
    ],
    {
      cancelable: false,
      ...Platform.select({
        ios: {
          userInterfaceStyle: 'light',
        },
        android: {
          cancelable: true,
        },
      }),
    }
  );
}