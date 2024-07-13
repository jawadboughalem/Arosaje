import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { IPV4 } = require('../Backend/config/config');

const Formulaire = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { photo } = route.params || {};
  const [nomPlante, setNomPlante] = useState('');
  const [description, setDescription] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [isDateDebutPickerVisible, setDateDebutPickerVisibility] = useState(false);
  const [isDateFinPickerVisible, setDateFinPickerVisibility] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.error('Aucun token trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    };

    fetchToken();
  }, []);

  const showDateDebutPicker = () => {
    setDateDebutPickerVisibility(true);
  };

  const hideDateDebutPicker = () => {
    setDateDebutPickerVisibility(false);
  };

  const handleDateDebutConfirm = (date) => {
    setDateDebut(date);
    hideDateDebutPicker();
  };

  const showDateFinPicker = () => {
    setDateFinPickerVisibility(true);
  };

  const hideDateFinPicker = () => {
    setDateFinPickerVisibility(false);
  };

  const handleDateFinConfirm = (date) => {
    setDateFin(date);
    hideDateFinPicker();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' });
  };

  const formatDateForSaving = (date) => {
    const month = date.getMonth() + 1; // getMonth() retourne les mois de 0 à 11
    const day = date.getDate();
    return `${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'La permission de localisation est nécessaire pour récupérer votre ville.');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      console.log('Réponse de l\'API:', data);

      if (data && data.address) {
        const village = data.address.village || '';
        const department = data.address.county || '';
        const postalCode = data.address.postcode || '';
        if (village && department && postalCode) {
          setLocalisation(`${village.toUpperCase()}, ${department}`);
          setCodePostal(postalCode);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer le village, le département ou le code postal.');
        }
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer les informations de localisation.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la localisation:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les informations de localisation.');
    }
  };

  const handleSubmit = async () => {
    const fullLocalisation = `${localisation}, ${codePostal}`;
    const data = {
      nomPlante,
      description,
      localisation: fullLocalisation,
      dateDebut: formatDateForSaving(dateDebut),
      dateFin: formatDateForSaving(dateFin),
      photo,
    };

    try {
      if (!token) {
        console.error('Aucun token disponible pour la soumission');
        return;
      }

      console.log('Données soumises:', data);
      console.log('Utilisation du token:', token);

      const response = await fetch(`http://${IPV4}:3000/annonces/addannonce`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      console.log('Statut de la réponse:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Données de la réponse:', responseData);
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
          <Text style={styles.label}>Photo de la plante :</Text>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={styles.previewImage}
            />
          ) : (
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Text style={styles.photoButtonText}>Choisir une photo</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.label}>Nom de la plante :</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Monstera Deliciosa"
            placeholderTextColor="#666"
            value={nomPlante}
            onChangeText={setNomPlante}
          />
          <Text style={styles.label}>Descriptif :</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: J'ai besoin de quelqu'un pour garder ma plante pendant mes vacances."
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Text style={styles.label}>Ville :</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={[styles.input, styles.locationInput]}
              placeholder="Ex: Paris, Île-de-France"
              placeholderTextColor="#666"
              value={localisation}
              onChangeText={setLocalisation}
            />
            <TouchableOpacity onPress={handleLocationPress} style={styles.locationIcon}>
              <Icon name="location-on" size={30} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Code Postal :</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 75001"
            placeholderTextColor="#666"
            value={codePostal}
            onChangeText={(text) => setCodePostal(text.replace(/[^0-9]/g, ''))}
            maxLength={5}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Période de garde :</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>du</Text>
            <TouchableOpacity onPress={showDateDebutPicker} style={styles.dateInputContainer}>
              <Text style={styles.dateInput}>{formatDate(dateDebut)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateDebutPickerVisible}
              mode="date"
              onConfirm={handleDateDebutConfirm}
              onCancel={hideDateDebutPicker}
            />
            <Text style={styles.dateLabel}>au</Text>
            <TouchableOpacity onPress={showDateFinPicker} style={styles.dateInputContainer}>
              <Text style={styles.dateInput}>{formatDate(dateFin)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateFinPickerVisible}
              mode="date"
              onConfirm={handleDateFinConfirm}
              onCancel={hideDateFinPicker}
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
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    borderColor: '#333', // Couleur noire pour les bordures
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
  },
  textArea: {
    height: 100,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationInput: {
    flex: 1,
  },
  locationIcon: {
    marginLeft: 10,
    alignSelf: 'center', // Centrer l'icône verticalement par rapport au champ
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
  dateInputContainer: {
    flex: 1,
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 40, // Align text vertically center
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  photoButton: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#077B17',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Formulaire;
