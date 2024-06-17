import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Formulaire() {
  const route = useRoute();
  const { photo } = route.params || {};
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    console.log('Form submitted:', { plantName, description, location, startDate, endDate, photo });
    // Add your form submission logic here
  };

  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <Text style={styles.label}>Nom plante :</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom plante"
        value={plantName}
        onChangeText={setPlantName}
      />
      <Text style={styles.label}>Descriptif :</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descriptif"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Localisation :</Text>
      <TextInput
        style={styles.input}
        placeholder="Localisation"
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Période de garde :</Text>
      <View style={styles.dateContainer}>
        <Text>du</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="JJ/MM/AAAA"
          value={startDate}
          onChangeText={setStartDate}
        />
        <Text>au</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="JJ/MM/AAAA"
          value={endDate}
          onChangeText={setEndDate}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Poster</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#5DB075',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
