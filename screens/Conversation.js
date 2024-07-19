import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MessageItem from '../components/MessageItem';

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const route = useRoute();
  const { conversation } = route.params;
  const currentUserId = 'currentUserId'; // Remplacez par l'ID de l'utilisateur courant

  useEffect(() => {
    const websocket = new WebSocket('ws://172.17.72.1:8080'); // Utilisez l'adresse IP correcte
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');

      // Envoyer un message pour identifier l'utilisateur
      websocket.send(JSON.stringify({ type: 'identify', userId: currentUserId }));
    };

    websocket.onmessage = (event) => {
      console.log(`Message received: ${event.data}`);
      const newMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error.message);
    };

    websocket.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event.reason}`);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (messageContent) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        type: 'message',
        from: currentUserId,
        to: conversation.userId, // Utilisez l'ID de l'utilisateur avec qui vous avez la conversation
        content: messageContent,
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(message));
      setMessages([...messages, message]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.timestamp}
        renderItem={({ item }) => <MessageItem message={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your message"
        onSubmitEditing={(event) => sendMessage(event.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '90%',
    marginVertical: 10,
    borderRadius: 5,
  },
});
