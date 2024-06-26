import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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

  const handleSubmit = async () => {
    const data = {
      plantName,
      description,
      location,
      startDate,
      endDate,
      photo,
      userName: 'John Doe',  // Exemple d'utilisateur fictif
      userImage: 'https://example.com/user.jpg'  // Exemple d'image utilisateur fictive
    };

    try {
      const response = await fetch('http://your-backend-url.com/auth/annonces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigation.navigate('Annonces');
      } else {
        console.error('Erreur lors de la soumission du formulaire');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <View style={styles.wrapper}>
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
    marginBottom: 30,
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
