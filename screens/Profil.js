import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParametresProfil from './ParametresProfil';

const { IPV4 } = require('../Backend/config/config');

const ProfileScreen = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('mesPlantes');
  const [userInfo, setUserInfo] = useState({ nom: '', prenom: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`http://${IPV4}:3000/user/user-info`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          console.log('Statut de la réponse:', response.status);
          const responseBody = await response.text(); // Loggez la réponse brute pour voir ce que le serveur renvoie
          console.log('Contenu de la réponse:', responseBody);

          if (response.ok) {
            const data = JSON.parse(responseBody);
            console.log('Données de la réponse:', data);
            setUserInfo(data);
          } else {
            console.error('Erreur lors de la récupération des informations utilisateur:', responseBody);
            Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur.');
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
          Alert.alert('Erreur', 'Problème de réseau.');
        }
      } else {
        console.error('Aucun token disponible pour la récupération des informations utilisateur');
        Alert.alert('Erreur', 'Aucun token disponible.');
      }
    };

    fetchUserInfo();
  }, []);

  const goToSettings = () => {
    setShowSettings(true);
  };

  const goBack = () => {
    setShowSettings(false);
  };

  const renderContent = () => {
    if (activeTab === 'mesPlantes') {
      return (
        <View style={styles.cardContainer}>
          <Text>Liste de mes plantes</Text>
          {/* Ajoutez ici le rendu des cartes pour vos plantes */}
        </View>
      );
    } else {
      return (
        <View style={styles.cardContainer}>
          <Text>Liste des plantes gardées</Text>
          {/* Ajoutez ici le rendu des cartes pour les plantes que vous gardez */}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {!showSettings ? (
        <View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
              <Icon name="settings-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Bon retour, {userInfo.prenom} </Text>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('mesPlantes')}
              style={[
                styles.tabButton,
                activeTab === 'mesPlantes' && styles.activeTabButton,
              ]}
            >
              <Text style={activeTab === 'mesPlantes' ? styles.activeTabText : styles.tabText}>
                Mes plantes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('mesGardes')}
              style={[
                styles.tabButton,
                activeTab === 'mesGardes' && styles.activeTabButton,
              ]}
            >
              <Text style={activeTab === 'mesGardes' ? styles.activeTabText : styles.tabText}>
                Mes gardes
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.contentContainer}>
            {renderContent()}
          </ScrollView>
        </View>
      ) : (
        <ParametresProfil onBack={goBack} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    top: 30,
  },
  settingsButton: {
    padding: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: -11,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  tabButton: {
    paddingVertical: 13,
    paddingHorizontal: 45,
  },
  activeTabButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    fontSize: 16,
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ProfileScreen;
