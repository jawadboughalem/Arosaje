import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <BlurView intensity={0} tint="light" style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: 10, // Ajoutez un padding en bas pour éviter l'interférence
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
