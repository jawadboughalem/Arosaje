import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Formulaire() {
  const route = useRoute();
  const { photo } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { title, description, photo });
  };

  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});