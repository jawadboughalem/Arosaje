import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Photos({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Nous avons besoin de votre permission pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Accorder la permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      navigation.navigate('CameraPreview', { photo: photo.uri });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedPhoto(result.assets[0].uri);
      navigation.navigate('CameraPreview', { photo: result.assets[0].uri });
    }
  };

  const toggleCameraFacing = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlashMode = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraType}
        flash={flashMode}
        ref={cameraRef}
      >
        <View style={styles.topLeftContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.topRightContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
            <Ionicons name="flashlight-outline" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.flipButton]} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <MaterialIcons name="camera-alt" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="images-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  camera: {
    flex: 1,
  },
  topLeftContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  topRightContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  flipButton: {
    marginTop: 20,
  },
  centerContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -35 }],
  },
  bottomRightContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  cameraButton: {
    backgroundColor: '#5DB075',
    padding: 20,
    borderRadius: 50,
  },
});
