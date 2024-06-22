import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput, Keyboard, Image, Dimensions } from 'react-native';
import Header from '../components/header';


export default function Messages() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Animation value for search bar width
  const searchWidth = new Animated.Value(0);

  const handleSearchPress = () => {
    setIsSearchOpen(true);

    // Start the search bar animation
    Animated.timing(searchWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // width animation doesn't require native driver
    }).start();
  };

  const handleCloseSearch = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    setIsSearchOpen(false);
    setSearchText('');

    // Reset the search bar animation
    Animated.timing(searchWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // width animation doesn't require native driver
    }).start();
  };

  return (
    <View style={styles.container}>
      <Header title="Messages" />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <Image
          source={require('../assets/loupe.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.searchBar, { width: searchWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
      }) }]}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleCloseSearch}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 90, // Adjusted for header height
    alignItems: 'center', // Center items horizontally
  },
  searchButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 2, // Higher than header to ensure it is on top
  },
  searchBar: {
    backgroundColor: '#ccc',
    marginTop: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
    width: '90%', // Adjusted width for responsive design
  },
  input: {
    fontSize: 16,
    height: 40,
  },
});
