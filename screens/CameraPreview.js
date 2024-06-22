import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/header';

const CameraPreview = ({ route }) => {
  const { photo } = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Nouvelle plante" onBackPress={() => navigation.goBack()} />
      {photo && <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ContactExpert')}
        >
          <Text style={styles.buttonText}>Contacter un expert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Formulaire', { photo })}
        >
          <Text style={styles.buttonText}>Créer un post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '80%',
    aspectRatio: 3 / 4,
    marginBottom: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 7,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraPreview;