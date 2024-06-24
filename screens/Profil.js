import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate('Annonces');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
          <Icon name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 38,
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