import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatePost = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Text>Créer un post avec la photo:</Text>
      <Image source={{ uri: photo }} style={styles.image} />
      {/* Ajoutez ici les champs et les boutons nécessaires pour créer un post */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
    borderRadius: 15,
  },
});

export default CreatePost;
