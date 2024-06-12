// Header.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <BlurView intensity={95} tint="light" style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 30, // Ajustez cette valeur pour déplacer le header vers le bas
    left: 0,
    right: 0,
    zIndex: 1,
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
