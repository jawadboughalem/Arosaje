import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/header';

export default function Formulaire() {
  const route = useRoute();
  const navigation = useNavigation();
  const { photo } = route.params || {};
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    console.log('Form submitted:', { plantName, description, location, startDate, endDate, photo });
  };

  return (
    <View style={styles.wrapper}>
      <Header title="Nouvelle plante" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
