import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput, Keyboard, Image, Text, FlatList } from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageItem from '../components/ConversationItem';

export default function Messages() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Messages');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchWidth = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);

  useEffect(() => {
    fetch('https://api.example.com/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      });
  }, []);

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

  const handleFilterPress = () => {
    // Ajoutez ici la logique pour ouvrir le filtre
    console.log('Filtre pressé');
  };

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchText.toLowerCase())
  );

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
          outputRange: ['30%', '60%'],
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
        <TouchableOpacity onPress={handleCloseSearch}>
          <Icon name="close-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      {isSearchOpen && (
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Icon name="filter-outline" size={30} color="#000" />
        </TouchableOpacity>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Messages' && styles.selectedTab]}
          onPress={() => setSelectedTab('Messages')}
        >
          <Text style={selectedTab === 'Messages' ? styles.activeTabText : styles.tabText}>
            📩 Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Notifications' && styles.selectedTab]}
          onPress={() => setSelectedTab('Notifications')}
        >
          <Text style={selectedTab === 'Notifications' ? styles.activeTabText : styles.tabText}>
            📢 Notifications
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'Messages' ? (
          isLoading ? (
            <Text>Chargement...</Text>
          ) : (
            <FlatList
              data={filteredMessages}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <MessageItem message={item} />}
              contentContainerStyle={{ paddingBottom: 80 }} // Ajustez le padding en bas
            />
          )
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
  filterButton: {
    position: 'absolute',
    top: 91,
    right: 20, // Ajustez la position de l'icône de filtre
    padding: 10,
  },
  input: {
    flex: 2,
    fontSize: 16,
    height: 40,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '90%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#077B17',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    fontSize: 16,
    color: '#077B17',
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
