import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Animated, Text, Image } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import io from 'socket.io-client';
import { IPV4 } from '../Backend/config/config';
import Header from '../components/HeaderMessage';
import { CommonActions } from '@react-navigation/native';

const socket = io(`http://${IPV4}:4000`);

const Conversation = ({ route, navigation }) => {
  const { ownerId, annonceId, conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);
  const [buttonOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (conversationId) {
      socket.emit('joinConversation', conversationId);
    } else {
      console.error("conversationId non défini dans les paramètres");
    }

    // Écouter les messages entrants uniquement pour les autres utilisateurs
    socket.on('newMessage', (msg) => {
      if (msg.idUser !== ownerId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off('newMessage');
      socket.off('SERVER_MSG');
    };
  }, [conversationId, ownerId]);

  const handleTextChange = (value) => {
    setText(value);
    setShowSendButton(value.length > 0);
  };

  const sendMessage = async () => {
    if (!text.trim()) return; // Vérifie que le message n'est pas vide
  
    const msg = {
      message: text,
      idUser: ownerId,
      annonceId,
      conversationId,
    };
  
    socket.emit('sendMessage', msg);
  
    setMessages((prevMessages) => [...prevMessages, msg]);
    setText('');
  
    try {
      const response = await fetch(`http://${IPV4}:3000/api/conversation/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId,
          userId: ownerId,
        }),
      });
  
      const data = await response.json();
      console.log("Message sauvegardé avec l'ID :", data.messageId);
  
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du message :", error);
    }
  };
    
  // Fonction pour choisir une image et l'envoyer
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const msg = {
        image: result.uri,
        idUser: ownerId,
        annonceId,
        conversationId,
      };
      // Envoyer l'image via Socket.io
      socket.emit('sendMessage', msg);

      // Ajouter l'image localement pour affichage immédiat
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  };

  const renderMessageItem = ({ item }) => {
    const isOwnMessage = item.idUser === ownerId;
    return (
      <View style={[styles.messageBubble, isOwnMessage ? styles.myMessage : styles.theirMessage]}>
        {item.message && <Text style={styles.messageText}>{item.message}</Text>}
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
      <Header
        userName="John Doe"
        onBackPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Messages' }],
            })
          );
        }}
      />

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="smile-o" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Votre message..."
          value={text}
          onChangeText={handleTextChange}
          placeholderTextColor="#ddd"
        />
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Text>
            <MaterialIcons name="photo-library" size={24} color="#fff" />
          </Text>
        </TouchableOpacity>
        {showSendButton && (
          <Animated.View style={{ opacity: buttonOpacity }}>
            <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
              <Text>
                <Ionicons name="send" size={24} color="#fff" />
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messages: {
    flex: 1,
    marginBottom: 10,
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
    backgroundColor: '#075E54',
    borderRadius: 30,
    margin: 10,
    height: 50,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  iconButton: {
    marginHorizontal: 5,
  },
});

export default Conversation;
