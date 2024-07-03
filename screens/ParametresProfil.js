import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const { IPV4 } = require('../Backend/config/config');

const ParametresProfil = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(null);
  const [hasProfilePic, setHasProfilePic] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();

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

  const handleDeleteAccount = async () => {
    if (!token) {
      Alert.alert('Token not found. Please try again.');
      return;
    }

    try {
      const response = await fetch(`http://${IPV4}:3000/user/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.error) {
        console.error('Error response:', data.error);
        Alert.alert(data.error);
      } else {
        console.log('Success response:', data.message);
        Alert.alert(data.message);
        await AsyncStorage.removeItem('token');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Bienvenue' }],
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Bienvenue' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error during logout');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          <View style={styles.profilePicContainer}>
            {hasProfilePic ? (
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePic} />
            ) : (
              <View style={styles.defaultProfilePic}>
                <Icon name="person-circle-outline" size={80} color="#ccc" />
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences utilisateur</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Langue préférée :</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre langue préférée"
              value={language}
              onChangeText={setLanguage}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Activer les notifications :</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres de compte</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Supprimer le compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  defaultProfilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  changePicText: {
    marginTop: 10,
    color: '#077B17',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#077B17',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#B92915',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#B92915',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ParametresProfil;
