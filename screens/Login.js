import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Composant principal de la page de connexion
export default function Login({ navigation }) {
  // États pour gérer les valeurs des champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Fonction de gestion de la connexion
  const handleLogin = () => {
    const validationErrors = {};

    // Vérification des champs obligatoires
    if (!email) validationErrors.email = "L'email est requis.";
    if (!password) validationErrors.password = "Le mot de passe est requis.";

    // Mise à jour des erreurs d'entrée
    setErrors(validationErrors);

    // Si pas d'erreurs, procéder à la connexion
    if (Object.keys(validationErrors).length === 0) {
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Stocker le token dans AsyncStorage pour une session persistante
          AsyncStorage.setItem('token', data.token);
          // Afficher une alerte de succès
          Alert.alert("Connexion réussie", "Vous êtes maintenant connecté.");
          // Naviguer vers la page principale après une connexion réussie
          navigation.navigate('Main');
        } else {
          // Afficher une alerte en cas de données incorrectes
          Alert.alert("Erreur de connexion", "Email ou mot de passe incorrect.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Afficher une alerte en cas d'erreur de connexion
        Alert.alert("Erreur de connexion", "Une erreur s'est produite. Veuillez réessayer.");
      });
    }
  };

  return (
    // Vue pour éviter le clavier qui masque le contenu
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>A’rosa- je</Text>
            <MaterialCommunityIcons name="flower" size={100} color="black" style={styles.icon} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Connexion</Text>
            
            {/* Champ Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
            {/* Champ Mot de passe */}
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            {/* Bouton de connexion */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            
            {/* Lien pour s'inscrire */}
            <Text style={styles.switchText}>
              Vous n’avez pas de compte?{' '}
              <Text style={styles.switchLink} onPress={() => navigation.navigate('Sign')}>
                Inscription
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#5DB075',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
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
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 0,
    padding: 20,
  },
  formTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 2,
    alignSelf: 'flex-start',
    marginLeft: '10%',
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
    marginTop: 50,
    color: 'black',
  },
  switchLink: {
    color: '#5DB075',
    fontWeight: 'bold',
  },
});