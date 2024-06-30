import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Mise à jour de l'importation
const { IPV4 } = require('../Backend/config/config');

const ParametresProfil = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(null);
  const [hasProfilePic, setHasProfilePic] = useState(false); // Ajout de l'état pour hasProfilePic

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Token not found');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        Alert.alert('Error fetching token');
      }
    };

    fetchToken();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (!token) {
      Alert.alert('Token not found. Please try again.');
      return;
    }

    console.log('Envoi de la requête avec le token:', token);

    try {
      const response = await fetch(`http://${IPV4}:3000/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.error('Error response:', data.error);
        Alert.alert(data.error);
      } else {
        console.log('Success response:', data.message);
        Alert.alert(data.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profilePicContainer}>
          {hasProfilePic ? (
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePic} />
          ) : (
            <View style={styles.defaultProfilePic}>
              <Icon name="person-circle-outline" size={100} color="#ccc" />
            </View>
          )}
          <Text style={styles.changePicText}>Changer la photo de profil</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe actuel :</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe actuel"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nouveau mot de passe :</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre nouveau mot de passe"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmer le nouveau mot de passe :</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmez votre nouveau mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
  },
  scrollViewContent: {
    padding: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ccc',
  },
  defaultProfilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  changePicText: {
    marginTop: 5,
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ParametresProfil;
