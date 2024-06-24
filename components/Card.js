import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ plantImage, plantName, location, userName, userImage }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plantImage }} style={styles.plantImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.plantName}>{plantName}</Text>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.userContainer}>
          <Image source={{ uri: userImage }} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#888',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
});

export default Card;