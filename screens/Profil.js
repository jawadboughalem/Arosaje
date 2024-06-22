import React, { useState, useRef } from 'react';
import { Animated, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/header'; // Assurez-vous d'importer le composant Header

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Photos');
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Profil" />
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity }]}>
          <Image 
            style={styles.avatarIcon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user.png' }}
          />
          <Image 
            style={styles.profileImage}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Portrait_of_a_woman_with_a_red_hair.jpg/220px-Portrait_of_a_woman_with_a_red_hair.jpg' }} 
          />
          <Text style={styles.name}>Melissa Peters</Text>
          <View style={styles.titleContainer}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/flower.png' }} style={styles.titleIcon} />
            <Text style={styles.title}>Botaniste</Text>
          </View>
          <View style={styles.location}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/place-marker.png' }} style={styles.locationIcon} />
            <Text style={styles.locationText}>Lagos, Nigeria</Text>
          </View>
        </Animated.View>

        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'Photos' ? styles.selectedTabButton : null]}
            onPress={() => setSelectedTab('Photos')}
          >
            <Text style={styles.tabButtonText}>Mes plantes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'Likes' ? styles.selectedTabButton : null]}
            onPress={() => setSelectedTab('Likes')}
          >
            <Text style={styles.tabButtonText}>Gardes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photos}>
          {selectedTab === 'Photos' ? (
            <>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
              <View style={styles.photo}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.photoImage} />
              </View>
            </>
          ) : (
            <Text>Likes content goes here...</Text>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, // Ajoutez un padding en haut pour compenser le Header
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatarIcon: {
    width: 50,
    height: 50,
    marginBottom: -150,
    zIndex: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
  },
  titleIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#5DB075', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
  },
  selectedTabButton: {
    backgroundColor: '#5DB075',
  },
  tabButtonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default ProfileScreen;
