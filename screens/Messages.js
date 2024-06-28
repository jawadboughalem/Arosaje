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

    Animated.timing(searchWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      textInputRef.current.focus();
    });
  };

  const handleCloseSearch = () => {
    Keyboard.dismiss();
    setIsSearchOpen(false);
    setSearchText('');

    Animated.timing(searchWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const isInboxEmpty = true; // Remplacez ceci par la logique réelle pour vérifier si la boîte de réception est vide
  const isNotificationsEmpty = true; // Remplacez ceci par la logique réelle pour vérifier si les notifications sont vides

  return (
    <View style={styles.container}>
      <Header title="Messages" />
      {!isSearchOpen && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Image
            source={require('../assets/loupe.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )}
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
          placeholder="Recherche..."
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
          isInboxEmpty ? (
            <Image
              source={require('../assets/annimation-message.gif')}
              style={styles.gif}
            />
          ) : (
            <Text style={styles.contentText}>Boîte de réception</Text>
          )
        ) : (
          isNotificationsEmpty ? (
            <Image
              source={require('../assets/norification.gif')}
              style={styles.gif}
            />
          ) : (
            <Text style={styles.contentText}>Notifications</Text>
          )
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
    top: 95,
    right: 160,
    padding: 10,
    zIndex: 2,
  },
  searchBar: {
    backgroundColor: '#000',
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  input: {
    flex: 2,
    fontSize: 16,
    height: 40,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
    borderBottomColor: '#00FF00',
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
  gif: {
    width: 100,
    height: 100,
    marginTop: -70,
  },
});
