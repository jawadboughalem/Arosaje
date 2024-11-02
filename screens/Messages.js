import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput, Keyboard, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/header'; 
import Icon from 'react-native-vector-icons/Ionicons';
import ConversationItem from '../components/ConversationItem';
import { IPV4 } from '../Backend/config/config';

export default function Messages() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Messages');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchWidth = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { ownerId } = route.params || {};

  useEffect(() => {
    if (!ownerId) {
      console.error("ownerId est undefined. Assurez-vous de passer ownerId dans les paramètres de navigation.");
      setIsLoading(false);
      return;
    }

    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://${IPV4}:3000/api/conversations/${ownerId}`);
        const responseText = await response.text();
        console.log("Réponse brute reçue :", responseText);

        const data = JSON.parse(responseText);
        setConversations(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations:', error);
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [IPV4, ownerId]);

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

  const handleConversationPress = (conversation) => {
    navigation.navigate('Conversation', { conversationId: conversation.Code_Conversation, ownerId });
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.userName && conversation.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Messages" />
      {!isSearchOpen && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Icon name="search" size={25} color="black" />
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
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
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
              data={filteredConversations}
              keyExtractor={item => item.Code_Conversation.toString()}
              renderItem={({ item }) => <ConversationItem conversation={item} onPress={handleConversationPress} />}
              contentContainerStyle={{ paddingBottom: 80 }}
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
    right: 20,
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
});
