import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

const { IPV4 } = require('../Backend/config/config');

const FormulaireBotaniste = () => {
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

  useEffect(() => {
    if (route.params && route.params.conseil) {
      const { Titre, Description, Theme } = route.params.conseil;
      setNomPlante(Titre);
      setDescription(Description);
      setSelectedTheme(Theme);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!selectedTheme) {
      console.error('Veuillez sélectionner un thème.');
      return;
    }

    const currentDate = moment().toISOString();
    const data = {
      Titre: nomPlante,
      Description: description,
      Theme: selectedTheme,
      Date: currentDate
    };

    // Pour la création, j'ajoute Code_Utilisateurs (à récupérer réellement depuis le token)
    if (!route.params?.conseil) {
      data.Code_Utilisateurs = 1;
    }

    try {
      if (!token) {
        console.error('Aucun token disponible pour la soumission');
        return;
      }

      const url = route.params && route.params.conseil
        ? `http://${IPV4}:3000/conseils/update/${route.params.conseil.Code_Conseils}`
        : `http://${IPV4}:3000/conseils/create`;

      const method = route.params && route.params.conseil ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigation.navigate('Conseils', { newConseil: responseData });
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
                <Picker.Item label="Sélectionner un thème" value="" />
                {themes.map((theme) => (
                  <Picker.Item key={theme.id} label={theme.name} value={theme.name} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  container: { flex: 1, justifyContent: 'center' },
  label: { fontSize: 15, marginBottom: 15, color: '#333', fontWeight: '500' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: { height: 150 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: { height: 50, width: '100%' },
  submitButton: {
    backgroundColor: '#077B17',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default FormulaireBotaniste;
