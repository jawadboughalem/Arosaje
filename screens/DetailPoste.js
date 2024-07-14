import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPV4 } from '../Backend/config/config';

const DetailPoste = ({ route }) => {
  const { annonce } = route.params;
  const navigation = useNavigation();

  const handleJeGarde = () => {
    navigation.navigate('Messages', { ownerId: annonce.code_Utilisateurs });
  };

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return "Date invalide"; // Gérer les dates nulles ou indéfinies
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Date invalide"; // Retourner un message d'erreur clair
    }
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `http://${IPV4}:3000/images/${annonce.photo}` }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>🌿 {annonce.titre}</Text>
        <Text style={styles.description}>📝 {annonce.description}</Text>
        <Text style={styles.period}>📅 Période de garde : {formatDate(annonce.dateDebut)} - {formatDate(annonce.dateFin)}</Text>
        <TouchableOpacity style={styles.button} onPress={handleJeGarde}>
          <Text style={styles.buttonText}>JE GARDE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    marginTop: 90, // Ajout de marge pour s'assurer que l'image ne déborde pas sur le header
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  image: {
    width: '90%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 20,
    minHeight: 150, // Assurez-vous que la description a suffisamment d'espace
  },
  period: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FF9800',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailPoste;
