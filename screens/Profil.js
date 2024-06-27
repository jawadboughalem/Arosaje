import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParametresProfil from './ParametresProfil';

const ProfileScreen = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('mesPlantes');

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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    marginVertical: 50,
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
