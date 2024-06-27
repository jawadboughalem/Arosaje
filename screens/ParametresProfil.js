import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ParametresProfil = ({ onBack }) => {
  const hasProfilePic = false; // Supposez qu'il s'agit de l'état de la photo de profil de l'utilisateur

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
          <TextInput style={styles.input} placeholder="Entrez votre mot de passe actuel" secureTextEntry />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nouveau mot de passe :</Text>
          <TextInput style={styles.input} placeholder="Entrez votre nouveau mot de passe" secureTextEntry />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmer le nouveau mot de passe :</Text>
          <TextInput style={styles.input} placeholder="Confirmez votre nouveau mot de passe" secureTextEntry />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
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
