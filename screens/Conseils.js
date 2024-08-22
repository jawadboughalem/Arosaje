import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CardConseil from '../components/CardConseil';

const { IPV4 } = require('../Backend/config/config');

const getIcon = (iconName, selected) => {
  const iconColor = selected ? '#fff' : '#333';
  const iconSize = 20;
  switch (iconName) {
    case 'flower':
      return <MaterialCommunityIcons name="flower" size={iconSize} color={iconColor} />;
    case 'leaf':
      return <Ionicons name="leaf" size={iconSize} color={iconColor} />;
    case 'tree':
      return <FontAwesome5 name="tree" size={iconSize} color={iconColor} />;
    case 'water':
      return <Ionicons name="water" size={iconSize} color={iconColor} />;
    case 'seedling':
      return <FontAwesome5 name="seedling" size={iconSize} color={iconColor} />;
    case 'city':
      return <MaterialIcons name="location-city" size={iconSize} color={iconColor} />;
    default:
      return <Ionicons name="help-circle" size={iconSize} color={iconColor} />;
  }
};

const Conseils = ({ route }) => {
  const [isBotanist, setIsBotanist] = useState(false);
  const [themes, setThemes] = useState([
    { id: 1, name: 'Entretien Général', icon: 'flower', conseils: [] },
    { id: 2, name: 'Plantes d\'intérieur', icon: 'leaf', conseils: [] },
    { id: 3, name: 'Plantes d\'extérieur', icon: 'tree', conseils: [] },
    { id: 4, name: 'Hydroponie', icon: 'water', conseils: [] },
    { id: 5, name: 'Plantes Aromatiques', icon: 'seedling', conseils: [] },
    { id: 6, name: 'Jardinage Urbain', icon: 'city', conseils: [] },
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
          setIsBotanist(true);
        }
      } catch (error) {
        console.error('Error retrieving botanist status:', error);
      }
    };

    checkBotanistStatus();
  }, []);

  const fetchConseils = async () => {
    try {
      const response = await fetch(`http://${IPV4}:3000/conseils/conseils`);
      
      // La j'ajoute un log pour afficher le statut et le contenu brut de la réponse
      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);
  
      // Je convertis en JSON que si la réponse est correcte
      if (response.ok) {
        const data = JSON.parse(responseText);
        setThemes((prevThemes) => {
          return prevThemes.map((theme) => {
            return {
              ...theme,
              conseils: data.filter((conseil) => conseil.Theme === theme.name),
            };
          });
        });
      } else {
        console.error('Erreur lors de la récupération des conseils:', responseText);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des conseils:', error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      fetchConseils();

      if (route.params?.newConseil) {
        const { newConseil } = route.params;
        console.log('Nouveau conseil reçu:', newConseil);
        setThemes((prevThemes) =>
          prevThemes.map((theme) =>
            theme.name === newConseil.Theme && !theme.conseils.some(c => c.Titre === newConseil.Titre && c.Description === newConseil.Description)
              ? {
                  ...theme,
                  conseils: [
                    ...theme.conseils,
                    { Titre: newConseil.Titre, Description: newConseil.Description, Theme: newConseil.Theme },
                  ],
                }
              : theme
          )
        );
      }
    }, [route.params])
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.overlay}>
        <View style={styles.themesContainer}>
          <ScrollView horizontal contentContainerStyle={styles.themesScrollContainer} showsHorizontalScrollIndicator={false}>
            {themes.map((theme) => (
              <Animatable.View key={theme.id} animation="bounceIn" delay={theme.id * 100}>
                <TouchableOpacity
                  style={[
                    styles.themeButton,
                    selectedTheme === theme.id && styles.selectedThemeButton,
                  ]}
                  onPress={() => setSelectedTheme(theme.id)}
                >
                  {getIcon(theme.icon, selectedTheme === theme.id)}
                  <Text
                    style={[
                      styles.themeButtonText,
                      selectedTheme === theme.id && styles.selectedThemeButtonText,
                    ]}
                  >
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.conseilsContainer}>
            {themes
              .find((theme) => theme.id === selectedTheme)
              .conseils.map((conseil, index) => {
                console.log('Rendering conseil:', conseil);
                return (
                  <Animatable.View key={index} style={styles.conseilCard} animation="fadeInUp" delay={index * 100}>
                    <CardConseil conseil={conseil} />
                  </Animatable.View>
                );
              })}
          </View>
        </ScrollView>
        {isBotanist && (
          <Animatable.View animation="bounceIn" style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('FormulaireBotaniste', { themes })}>
              <Ionicons name="add" size={40} color="white" />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  themesContainer: {
    height: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  themesScrollContainer: {
    paddingHorizontal: 10,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  selectedThemeButton: {
    backgroundColor: '#077B17',
  },
  themeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 5,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  addButton: {
    backgroundColor: '#077B17',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Conseils;
