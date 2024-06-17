import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import Card from '../components/Card';

const CardsPage = () => {
  const [data, setData] = useState([
    { id: 1, photoUrl: 'https://via.placeholder.com/150', authorName: 'John Doe', authorIcon: 'person-outline', date: '12 Juin 2024' },
    { id: 2, photoUrl: 'https://via.placeholder.com/150', authorName: 'Jane Smith', authorIcon: 'person-outline', date: '10 Juin 2024' },
  ]);

  const renderItem = ({ item }) => (
    <Card
      photoUrl={item.photoUrl}
      authorName={item.authorName}
      authorIcon={item.authorIcon}
      date={item.date}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header avec barre de recherche */}
      <View style={styles.header}>
        {/* Barre de recherche */}
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          onChangeText={(text) => {
            // Logique de recherche ici (filtrage des données)
          }}
        />
      </View>

      {/* Liste de cartes */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    height: 60, // Ajustez la hauteur selon les besoins
    backgroundColor: 'transparent', // Fond transparent
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  flatList: {
    flex: 1,
    paddingBottom: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white', // Fond blanc pour la barre de recherche
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20, // Augmenter cette valeur pour rendre les coins plus arrondis
    paddingHorizontal: 10,
  },
});

export default CardsPage;