import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { IPV4 } from '../Backend/config/config';
import HeaderConversation from '../components/HeaderConversation';

const Conversation = () => {
  const route = useRoute();
  const { ownerId, annonceId, userName, userImage } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [image, setImage] = useState(null);
  const [showSendButton, setShowSendButton] = useState(false);
  const flatListRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${IPV4}:3000`);

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: 'identify', userId: ownerId }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, data]);
        scrollToEnd();
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    fetch(`http://${IPV4}:3000/messages/${ownerId}/${annonceId}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));

    return () => {
      ws.current.close();
    };
  }, [ownerId, annonceId]);

  const sendMessage = () => {
    const message = {
      type: 'message',
      from: ownerId,
      to: annonceId,
      content: messageText,
      timestamp: new Date().toISOString(),
      image: image ? image.uri : null
    };
    ws.current.send(JSON.stringify(message));
    setMessages([...messages, message]);
    setMessageText('');
    setImage(null);
    scrollToEnd();
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const scrollToEnd = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleTextChange = (text) => {
    setMessageText(text);
    setShowSendButton(text.length > 0);
  };

  const renderItem = ({ item }) => {
    const isOwnMessage = item.from === ownerId;
    return (
      <View style={[styles.messageContainer, isOwnMessage ? styles.ownMessage : styles.otherMessage]}>
        {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <HeaderConversation userName={userName} userImage={userImage} />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.messageList}
        onContentSizeChange={() => scrollToEnd()}
      />
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
          <MaterialIcons name="photo-camera" size={24} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Votre message..."
          value={messageText}
          onChangeText={handleTextChange}
        />
        {showSendButton ? (
          <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
            <Ionicons name="send" size={28} color="#077B17" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={pickImageFromGallery} style={styles.iconButton}>
              <FontAwesome5 name="images" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="microphone" size={24} color="#555" />
            </TouchableOpacity>
          </>
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
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '70%',
  },
  ownMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  iconButton: {
    padding: 5,
  },
});

export default Conversation;
