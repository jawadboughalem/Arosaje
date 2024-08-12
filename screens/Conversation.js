import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Animated, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import io from 'socket.io-client';
import { IPV4 } from '../Backend/config/config';
import HeaderConversation from '../components/HeaderConversation';

const socket = io(`http://${IPV4}:8000`);

const Conversation = ({ route }) => {
  const { ownerId, annonceId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);
  const [buttonOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    socket.on('SERVER_MSG', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('SERVER_MSG');
    };
  }, []);

  const handleTextChange = (value) => {
    setText(value);
    if (value.length > 0) {
      setShowSendButton(true);
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowSendButton(false));
    }
  };

  const sendMessage = () => {
    const msg = {
      text,
      ownerId,
      annonceId,
    };
    socket.emit('CLIENT_MSG', msg);
    setText('');
    handleTextChange(''); // Réinitialiser l'état du texte
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
      <HeaderConversation userName={userName} />

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <MaterialIcons name="photo-camera" size={24} color="#0091FF" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Votre message..."
          value={text}
          onChangeText={handleTextChange}
        />
        {!showSendButton && (
          <View style={styles.iconsRight}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="image" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {showSendButton && (
          <Animated.View style={{ opacity: buttonOpacity }}>
            <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
              <Ionicons name="send" size={24} color="#0091FF" />
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
    marginBottom: 10, // Assure que la FlatList ne soit pas cachée par la barre de messages
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
    backgroundColor: '#333333',
    borderRadius: 30,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  iconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 5,
  },
});

export default Conversation;
