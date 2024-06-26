import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <LinearGradient
          colors={['transparent', '#d3d3d3', 'transparent']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradientLine}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gradientLine: {
    position: 'absolute',
    bottom: 10,
    left: '25%',
    right: '25%',
    height: 2,
  },
});

export default Header;
