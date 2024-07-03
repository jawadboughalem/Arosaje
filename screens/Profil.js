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
  const [mesPlantes, setMesPlantes] = useState([]);
  const [mesGardes, setMesGardes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          } else {
            Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur.');
          }
        } catch (error) {
          Alert.alert('Erreur', 'Problème de réseau.');
        }
      } else {
        Alert.alert('Erreur', 'Aucun token disponible.');
      }
    };

    const fetchMesPlantes = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${IPV4}:3000/user/mes-plantes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMesPlantes(data);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les plantes.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Problème de réseau.');
      }
    };

    const fetchMesGardes = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${IPV4}:3000/user/mes-gardes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMesGardes(data);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les gardes.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Problème de réseau.');
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetchUserInfo();
      await fetchMesPlantes();
      await fetchMesGardes();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const goToSettings = () => {
    setShowSettings(true);
  };

  const goBack = () => {
    setShowSettings(false);
  };

  const renderMesPlantes = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Chargement en cours...</Text>
        </View>
      );
    }

    if (mesPlantes.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Vous n'avez fait garder aucune de vos plantes pour le moment 🌱</Text>
        </View>
      );
    }

    return mesPlantes.map((plante, index) => (
      <View key={index} style={styles.cardContainer}>
        <Text>{plante.nom}</Text>
      </View>
    ));
  };

  const renderMesGardes = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Chargement en cours...</Text>
        </View>
      );
    }

    if (mesGardes.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Vous n'avez encore gardé aucune plante 🌿</Text>
        </View>
      );
    }

    return mesGardes.map((garde, index) => (
      <View key={index} style={styles.cardContainer}>
        <Text>{garde.nom}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {!showSettings ? (
        <View>
          <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
            <Icon name="settings-outline" size={30} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Bon retour, {userInfo.prenom}</Text>
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
                🌱 Mes plantes
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
                🌿 Mes gardes
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.contentContainer}>
            {activeTab === 'mesPlantes' ? renderMesPlantes() : renderMesGardes()}
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
    paddingHorizontal: 20,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#077B17',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    fontSize: 16,
    color: '#077B17',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
