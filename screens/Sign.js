import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sign({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    fetch('http://10.52.84.190:3000/api/auth/signup', { // Utilisez l'adresse IP correcte
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          AsyncStorage.setItem('token', data.token);
          navigation.navigate('Main');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>A’rosa- je</Text>
        <MaterialCommunityIcons name="flower" size={100} color="black" style={styles.icon} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Inscription</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Inscription</Text>
        </TouchableOpacity>
        <Text style={styles.switchText}>
          Vous avez déjà un compte?{' '}
          <Text style={styles.switchLink} onPress={() => navigation.navigate('Login')}>
            Se connecter
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5DB075',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 90,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: Platform.select({ ios: 'Helvetica', android: 'sans-serif-light' }),
  },
  icon: {
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -70,
    padding: 20,
  },
  formTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5DB075',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    color: 'black',
  },
  switchLink: {
    color: '#5DB075',
    fontWeight: 'bold',
  },
});
