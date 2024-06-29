import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/form.png');

const { IPV4 } = require('../Backend/config/config');

const Conseils = () => {
  const [isBotanist, setIsBotanist] = useState(false);
  const [themes, setThemes] = useState([
    { id: 1, name: 'Entretien Général', conseils: [] },
    { id: 2, name: 'Plantes d\'intérieur', conseils: [] },
    { id: 3, name: 'Plantes d\'extérieur', conseils: [] },
    { id: 4, name: 'Hydroponie', conseils: [] },
    { id: 5, name: 'Plantes Aromatiques', conseils: [] },
    { id: 6, name: 'Jardinage Urbain', conseils: [] },
  ]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
  const navigation = useNavigation();

  useEffect(() => {
    const checkBotanistStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('isBotanist');
        console.log('Botanist status from AsyncStorage:', status);
        if (status === '1') {
          setIsBotanist(true);
        } else {
          setIsBotanist(false);
        }
      } catch (error) {
        console.error('Error retrieving botanist status:', error);
      }
    };

    checkBotanistStatus();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.themesContainer}>
            <ScrollView horizontal contentContainerStyle={styles.themesScrollContainer} showsHorizontalScrollIndicator={false}>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  style={[
                    styles.themeButton,
                    selectedTheme === theme.id && styles.selectedThemeButton,
                  ]}
                  onPress={() => setSelectedTheme(theme.id)}
                >
                  <Text
                    style={[
                      styles.themeButtonText,
                      selectedTheme === theme.id && styles.selectedThemeButtonText,
                    ]}
                  >
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.conseilsContainer}>
              {themes
                .find((theme) => theme.id === selectedTheme)
                .conseils.map((conseil, index) => (
                  <View key={index} style={styles.conseilCard}>
                    <Image source={{ uri: conseil.imageUrl }} style={styles.conseilImage} />
                    <Text style={styles.conseilText}>{conseil.text}</Text>
                  </View>
                ))}
            </View>
          </ScrollView>
          {isBotanist && (
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('FormulaireBotaniste')}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  themesContainer: {
    height: 50,
    marginTop: 100,
    marginBottom: 20,
  },
  themesScrollContainer: {
    paddingHorizontal: 10,
  },
  themeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  },
  selectedThemeButton: {
    backgroundColor: '#5DB075',
  },
  themeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  selectedThemeButtonText: {
    color: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  conseilsContainer: {
    marginBottom: 20,
  },
  conseilCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  conseilImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  conseilText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#5DB075',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Conseils;
