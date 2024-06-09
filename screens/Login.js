import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>A’rosa- je</Text>
        <MaterialCommunityIcons name="flower" size={100} color="black" style={styles.icon} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Connexion</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
        <Text style={styles.switchText}>
          Vous n’avez pas de compte?{' '}
          <Text style={styles.switchLink} onPress={() => navigation.navigate('Sign')}>
            Inscription
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
    marginTop: -50,
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
