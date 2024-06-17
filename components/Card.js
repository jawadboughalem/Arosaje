import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importer les icônes nécessaires

const Card = ({ photoUrl, authorName, authorIcon, date }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: photoUrl }} style={styles.photo} />
      <View style={styles.content}>
        <Text style={styles.authorName}>{authorName}</Text>
        <View style={styles.authorInfo}>
          <Ionicons name={authorIcon} size={24} color="black" />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    color: '#666666',
  },
});

export default Card;