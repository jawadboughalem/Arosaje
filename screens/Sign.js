import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Switch, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Fonction principale de l'application
export default function App({ navigation }) {
  // États pour gérer les valeurs des champs du formulaire
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBotanist, setIsBotanist] = useState(false);
  const [errors, setErrors] = useState({});

  // Fonction de gestion de l'inscription
  const handleSignUp = () => {
    const validationErrors = {};
    
    // Vérification des champs obligatoires
    if (!name) validationErrors.name = "Le nom est requis.";
    if (!surname) validationErrors.surname = "Le prénom est requis.";
    if (!email) validationErrors.email = "L'email est requis.";
    if (!password) validationErrors.password = "Le mot de passe est requis.";
    
    // Mise à jour des erreurs d'entrée
    setErrors(validationErrors);

    // Si pas d'erreurs, traiter l'inscription
    if (Object.keys(validationErrors).length === 0) {
      // Logique d'inscription ici
      console.log({
        name,
        surname,
        email,
        password,
        isBotanist,
      });
      // Afficher une alerte de succès
      Alert.alert("Inscription réussie", "Votre compte a été créé avec succès.");
      
      // Réinitialiser les champs du formulaire après une inscription réussie
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setIsBotanist(false);
      setErrors({});
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
            <Text style={styles.formTitle}>Inscription</Text>
            
            {/* Champ Nom */}
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            {/* Champ Prénom */}
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={surname}
              onChangeText={setSurname}
            />
            {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
            
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
            
            {/* Commutateur pour botaniste */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Êtes-vous un botaniste?</Text>
              <Switch
                value={isBotanist}
                onValueChange={setIsBotanist}
              />
            </View>
            
            {/* Bouton d'inscription */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Inscription</Text>
            </TouchableOpacity>
            
            {/* Lien pour se connecter */}
            <Text style={styles.switchText}>
              Vous avez déjà un compte?{' '}
              <Text style={styles.switchLink} onPress={() => navigation.navigate('Login')}>
                Se connecter
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
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
