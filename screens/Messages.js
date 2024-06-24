import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput, Keyboard, Image, Text } from 'react-native';
import Header from '../components/header';

export default function Messages() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Messages');
  const searchWidth = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);

  const handleSearchPress = () => {
    setIsSearchOpen(true);

    // Start the search bar animation
    Animated.timing(searchWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      textInputRef.current.focus(); // Focus the TextInput after the animation completes
    });
  };

  const handleCloseSearch = () => {
    Keyboard.dismiss();
    setIsSearchOpen(false);
    setSearchText('');

    // Reset the search bar animation
    Animated.timing(searchWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
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

      <Animated.View style={[styles.searchBar, {
        width: searchWidth.interpolate({
          inputRange: [0, 1],
          outputRange: ['30%', '69%'],
        }),
        opacity: searchWidth.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      }]}>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleCloseSearch}
        />
      </Animated.View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Messages' && styles.selectedTab]}
          onPress={() => setSelectedTab('Messages')}
        >
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Notifications' && styles.selectedTab]}
          onPress={() => setSelectedTab('Notifications')}
        >
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'Messages' ? (
          <Text style={styles.contentText}>Boîte de réception</Text>
        ) : (
          <Text style={styles.contentText}>Notifications</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 68,
    alignItems: 'center',
  },
  searchButton: {
    position: 'absolute',
    top: 75,
    right: 9,
    padding: 10,
    zIndex: 2,
  },
  searchBar: {
    backgroundColor: '#000',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#00BFFF', // Light blue shadow color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, // Ensure the height is defined
  },
  input: {
    flex: 2,
    fontSize: 16,
    height: 40,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FF00', // Green color for the underline
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 20,
  },
});

