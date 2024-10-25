import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPV4 } from '../Backend/config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const DetailPoste = ({ route }) => {
  const { annonce } = route.params;
  const navigation = useNavigation();
  const buttonAnimation = new Animated.Value(1);

  const handleJeGarde = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error("Token utilisateur manquant");
        return;
      }
  
      const decodedToken = jwt_decode(token);
      const connectedUserId = decodedToken.userId;
      const ownerId = annonce.Code_Postes;
  
      if (!connectedUserId || !ownerId) {
        console.error("L'ID utilisateur connecté ou l'ID de l'annonce est manquant");
        return;
      }
  
      const response = await fetch(`http://${IPV4}:3000/api/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ownerId: ownerId,
          expediteurId: connectedUserId,
        }),
      });
  
      // Log la réponse brute pour diagnostiquer le contenu
      const text = await response.text();
      console.log("Réponse brute : ", text);
  
      // Si la réponse n'est pas un JSON, affiche une erreur
      if (!response.ok) {
        console.error("Erreur du serveur : ", text);
        return;
      }
  
      // Analyse en JSON seulement si la réponse est correcte
      const data = JSON.parse(text);
      if (data.conversationId) {
        navigation.navigate('MessagesStack', {
          screen: 'Conversation',
          params: { ownerId: ownerId, annonceId: annonce.Code_Postes, conversationId: data.conversationId },
        });
      } else {
        console.error('Conversation ID not received');
      }
    } catch (error) {
      console.error('Erreur lors de la gestion de la conversation :', error);
    }
  };    
  
  const formatDate = (dateString) => {
    if (!dateString) return "Date invalide";
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Date invalide";
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
              animateButton(); // Animation du bouton lors du clic
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
    height: 350,
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
    marginBottom: 90,
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
