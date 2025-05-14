import React, { useRef, useEffect } from 'react';
import { Animated, View, Dimensions, StyleSheet, Pressable } from 'react-native';

const SideModal = ({ visible, onClose, children }) => {
  const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: '100%',
  },

});

export default SideModal;
