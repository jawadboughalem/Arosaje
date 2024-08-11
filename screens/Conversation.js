import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4 } from '../Backend/config/config';
import HeaderConversation from '../components/HeaderConversation'; 

const socket = io(`http://${IPV4}:8000`);

const Conversation = ({ route }) => {
  const { ownerId, annonceId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUserProfilePic = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
              Alert.alert('Token not found');
              return;
          }
          
          const response = await fetch(`http://${IPV4}:3000/profile-pic`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
  
          if (!response.ok) {
              console.error('Erreur HTTP:', response.status, response.statusText);
              throw new Error('Failed to fetch profile pic');
          }
  
          const imageData = await response.blob(); 
          const reader = new FileReader();
          reader.readAsDataURL(imageData);
          reader.onloadend = () => {
              const base64data = reader.result;
              setUserImage(base64data); 
          };
      } catch (error) {
          console.error('Erreur lors de la récupération de la photo de profil:', error);
          Alert.alert('Une erreur est survenue lors de la récupération de la photo de profil.');
      }
  };  

    fetchUserProfilePic();
  }, []);

  useEffect(() => {
    socket.on('SERVER_MSG', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('SERVER_MSG');
    };
  }, []);

  const sendMessage = () => {
    const msg = {
      text,
      ownerId,
      annonceId,
    };
    socket.emit('CLIENT_MSG', msg);
    setText('');
    setShowSendButton(false);
  };

  const handleTextChange = (value) => {
    setText(value);
    setShowSendButton(value.length > 0);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const msg = {
        image: result.uri,
        ownerId,
        annonceId,
      };
      socket.emit('CLIENT_MSG', msg);
    }
  };

  const renderMessageItem = ({ item }) => {
    const isOwnMessage = item.ownerId === ownerId;
    return (
      <View style={[styles.messageBubble, isOwnMessage ? styles.myMessage : styles.theirMessage]}>
        {item.text && <Text style={styles.messageText}>{item.text}</Text>}
        {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <HeaderConversation userName={userName} userImage={userImage} />
      
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        {!showSendButton && (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <MaterialIcons name="photo" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="gray" />
            </TouchableOpacity>
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Your message"
          value={text}
          onChangeText={handleTextChange}
        />
        {showSendButton ? (
          <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
            <Ionicons name="send" size={24} color="#077B17" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messages: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F9F9F9',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
});

export default Conversation;
