import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FormulaireBotaniste = () => {
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Logique pour soumettre le formulaire
    // Par exemple, vous pouvez envoyer les données à un serveur ou les stocker localement
    console.log('Nom de la plante:', plantName);
    console.log('Description:', description);

    // Retour à la page des conseils après soumission
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom de la plante :</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la plante"
        value={plantName}
        onChangeText={setPlantName}
      />
      <Text style={styles.label}>Descriptif du conseil :</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descriptif du conseil"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
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
  submitButton: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormulaireBotaniste;
