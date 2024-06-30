import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { IPV4 } = require('../Backend/config/config');

const Formulaire = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [nomPlante, setNomPlante] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [themes, setThemes] = useState(route.params.themes || []);
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

  const handleSubmit = async () => {
    const data = {
      nomPlante,
      description,
      themeId: selectedTheme,
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
        navigation.navigate('Conseils', { newConseil: data });
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la soumission du formulaire:', errorData);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/form.png')} style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          extraScrollHeight={20}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.label}>Nom de la plante :</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Monstera Deliciosa"
              placeholderTextColor="#666"
              value={nomPlante}
              onChangeText={setNomPlante}
            />
            <Text style={styles.label}>Thème :</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTheme}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedTheme(itemValue)}
              >
                {themes.map((theme) => (
                  <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Descriptif du conseil :</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descriptif du conseil"
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 15,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Formulaire;
