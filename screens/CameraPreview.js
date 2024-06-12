import React from 'react';
<<<<<<< HEAD
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CameraPreview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photo } = route.params;
=======
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CameraPreview = ({ route }) => {
  const { photo } = route.params;
  const navigation = useNavigation();
>>>>>>> master

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
<<<<<<< HEAD
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Formulaire', { photo })}
        >
          <Text style={styles.text}>Create Announcement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
=======
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreatePost', { photo })}
      >
        <Text style={styles.buttonText}>Créer un post</Text>
      </TouchableOpacity>
    </View>
  );
};
>>>>>>> master

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
<<<<<<< HEAD
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#5DB075',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
=======
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    height: '60%',
    borderRadius: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5DB075',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CameraPreview;
>>>>>>> master
