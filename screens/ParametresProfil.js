import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ParametresProfil = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePic} />
        <Text style={styles.changePicText}>Changer la photo de profil</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text>Email :</Text>
        <TextInput style={styles.input} placeholder="Entrez votre email" />
      </View>
      <View style={styles.inputContainer}>
        <Text>Mot de passe :</Text>
        <TextInput style={styles.input} placeholder="Entrez votre mot de passe" secureTextEntry />
      </View>
      <Button title="Enregistrer les modifications" onPress={() => {}} />
      <Button title="Déconnexion" onPress={() => {}} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePicText: {
    marginTop: 8,
    color: '#5DB075',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
});

export default ParametresProfil;
