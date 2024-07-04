import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { conversationId } = route.params;

  useEffect(() => {
    // Remplacez cette URL par l'URL de votre API pour récupérer les messages de la conversation
    fetch(`https://api.example.com/conversations/${conversationId}`)
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      });
  }, [conversationId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Envoyer le message à l'API et ajouter le message à l'état local
      const message = {
        id: messages.length + 1, // ID temporaire, doit être généré par l'API
        content: newMessage,
        sender: 'Vous',
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.messagesContainer}>
        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageItem}>
                <Text style={styles.messageSender}>{item.sender}</Text>
                <Text style={styles.messageContent}>{item.content}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Icon name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageItem: {
    marginBottom: 10,
  },
  messageSender: {
    fontWeight: 'bold',
  },
  messageContent: {
    marginTop: 5,
  },
  messageTime: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Conversation;
