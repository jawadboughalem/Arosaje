import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPV4 } from '../Backend/config/config';

const DetailPoste = ({ route }) => {
  const { annonce } = route.params;
  const navigation = useNavigation();
  const buttonAnimation = new Animated.Value(1);

  const handleJeGarde = () => {
    navigation.navigate('Messages', { ownerId: annonce.code_Utilisateurs });
  };

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return "Date invalide"; // Gère les dates nulles ou indéfinies
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Date invalide"; // Retourner un message d'erreur clair
    }
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `http://${IPV4}:3000/annonces/image/${annonce.photo}` }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>🌿 {annonce.titre}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>📝 {annonce.description}</Text>
        <Text style={styles.sectionTitle}>Période de garde</Text>
        <Text style={styles.period}>📅 {formatDate(annonce.dateDebut)} - {formatDate(annonce.dateFin)}</Text>
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonAnimation }] }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleJeGarde();
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>JE GARDE</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    height: 350, // En portrait
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 30,
    marginTop: 120,
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#077B17',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 20,
    minHeight: 170,
  },
  period: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#FF9800',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 90, // Ajout d'espace en bas du bouton
  },
  button: {
    backgroundColor: '#077B17',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
