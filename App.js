import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
=======
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
>>>>>>> master
import { BlurView } from 'expo-blur';

import Annonces from './screens/Annonces';
import Messages from './screens/Messages';
import Photos from './screens/Photos';
import Conseils from './screens/Conseils';
import Profil from './screens/Profil';
import CameraPreview from './screens/CameraPreview';
<<<<<<< HEAD
import Formulaire from './screens/Formulaire';

const Tab = createBottomTabNavigator();
=======
import CreatePost from './screens/CreatePost';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PhotosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="CameraPreview" component={CameraPreview} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
}
>>>>>>> master

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#5DB075',
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 9,
            fontWeight: '500',
          },
          tabBarStyle: {
            position: 'absolute',
            height: 53,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            borderTopWidth: 0,
            paddingBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          },
          tabBarBackground: () => (
            <BlurView intensity={95} tint='light'/>
          ),
        }}
      >
        <Tab.Screen
          name="Annonces"
          component={Annonces}
          options={{
            title: 'Annonces',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'mail' : 'mail-outline'} size={28} color={color} />
            ),
          }}
        />
        <Tab.Screen
<<<<<<< HEAD
          name="Photos"
          component={Photos}
=======
          name="PhotosStack"
          component={PhotosStack}
>>>>>>> master
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => null,
            tabBarButton: (props) => (
              <TouchableOpacity
                style={styles.cameraButton}
                {...props}
              >
                <MaterialIcons name='camera' size={49} color='#5DB075' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Conseils"
          component={Conseils}
          options={{
            title: 'Conseils',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'leaf' : 'leaf-outline'} size={28} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={28} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    top: -35,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 80,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#5DB075',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
