// screens/Conversation.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { IPV4 } from '../Backend/config/config';

const socket = io(`http://${IPV4}:8000`);

const Conversation = ({ route }) => {
  const { ownerId, annonceId } = route.params;
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

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
      username,
      text,
      ownerId,
      annonceId,
    };
    socket.emit('CLIENT_MSG', msg);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text>{item.username}: {item.text}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Your message"
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messages: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default Conversation;
