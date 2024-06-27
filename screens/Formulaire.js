import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { IPV4 } = require('../Backend/config/config');

const Formulaire = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { photo } = route.params || {};
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleDateChange = (text, setDate) => {
    // Automatically add slashes to the date input
    const formattedText = text.replace(/^(\d{2})(\d{2})?(\d{4})?$/, (match, p1, p2, p3) => {
      if (p3) return `${p1}/${p2}/${p3}`;
      else if (p2) return `${p1}/${p2}`;
      else return p1;
    });
    setDate(formattedText);
  };

  const handleSubmit = async () => {
    const data = {
      plantName,
      description,
      location,
      startDate,
      endDate,
      photo,
    };

    try {
      if (!token) {
        console.error('No token available for submission');
        return;
      }

      console.log('Submitting data:', data);
      console.log('Using token:', token);

      const response = await fetch(`http://${IPV4}:3000/annonces/addannonce`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        navigation.navigate('Annonces');
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la soumission du formulaire:', errorData);
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
            <Text style={styles.dateLabel}>du</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="JJ/MM/AAAA"
              value={startDate}
              onChangeText={(text) => handleDateChange(text, setStartDate)}
              keyboardType="numeric"
            />
            <Text style={styles.dateLabel}>au</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="JJ/MM/AAAA"
              value={endDate}
              onChangeText={(text) => handleDateChange(text, setEndDate)}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Poster</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Formulaire;