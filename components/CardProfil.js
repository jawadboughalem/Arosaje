
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Card = ({ imageUrl }) => {
  return (
    <View style={styles.photo}>
      <Image source={{ uri: imageUrl }} style={styles.photoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: '32%',
    marginBottom: 10,
  },
  photoImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default Card;