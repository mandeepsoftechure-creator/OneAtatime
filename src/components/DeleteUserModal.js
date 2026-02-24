import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { Fonts } from '../config/styles/fonts';
import { BaseColor } from '../config/theme';

const DeleteUserModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          {/* Warning Icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>⚠️</Text>
          </View>

          <Text style={styles.title}>Delete Account</Text>

          <Text style={styles.message}>
            Are you sure you want to delete your account?
          </Text>

          <Text style={styles.subMessage}>
            This action is permanent and cannot be undone.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: responsiveHeight(3),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: responsiveHeight(1.2),
  },
  icon: {
    fontSize: responsiveFontSize(4),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  message: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: BaseColor.black,
  },
  subMessage: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: BaseColor.gray,
    marginTop: responsiveHeight(0.8),
    marginBottom: responsiveHeight(3),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical:10
  },
  cancelButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColor.gray,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: Fonts.semiBold,
    color: BaseColor.black,
    fontSize: responsiveFontSize(1.6),
  },
  deleteText: {
    fontFamily: Fonts.semiBold,
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
  },
});
