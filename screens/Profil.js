import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParametresProfil from './ParametresProfil'; 

const ProfileScreen = () => {
  const [showSettings, setShowSettings] = useState(false);

  const goToSettings = () => {
    setShowSettings(true);
  };

  const goBack = () => {
    setShowSettings(false);
  };

  return (
    <View style={styles.container}>
      {!showSettings ? (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
            <Icon name="settings-outline" size={30} color="#000" />
          </TouchableOpacity>
    
        </View>
      ) : (
        <ParametresProfil onBack={goBack} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, 
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
  },
  settingsButton: {
    padding: 10,
  },
});

export default ProfileScreen;
