import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CameraPreview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    height: '60%',
    borderRadius: 15,
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
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
