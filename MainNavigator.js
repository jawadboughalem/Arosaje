import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importez vos icônes ici

import TabBarContext from './components/TabBarContext';
import Annonces from './screens/Annonces';
import Messages from './screens/Messages';
import Photos from './screens/Photos';
import Conseils from './screens/Conseils';
import Profil from './screens/Profil';
import CameraPreview from './screens/CameraPreview';
import Formulaire from './screens/Formulaire';
import FormulaireBotaniste from './screens/FormulaireBotaniste';
import Header from './components/header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PhotosStack({ navigation }) {
  const { setIsTabBarVisible } = useContext(TabBarContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setIsTabBarVisible(false),
          blur: () => setIsTabBarVisible(true),
        }}
      />
      <Stack.Screen
        name="CameraPreview"
        component={CameraPreview}
        options={{
          title: 'Nouvelle plante',
          headerTitleAlign: 'center',
          tabBarVisible: false,
        }}
        listeners={{
          focus: () => setIsTabBarVisible(false),
          blur: () => setIsTabBarVisible(true),
        }}
      />
      <Stack.Screen
        name="Formulaire"
        component={Formulaire}
        options={{
          title: 'Nouveau poste',
          headerTitleAlign: 'center',
          tabBarVisible: false,
        }}
        listeners={{
          focus: () => setIsTabBarVisible(false),
          blur: () => setIsTabBarVisible(true),
        }}
      />
    </Stack.Navigator>
  );
}

function ConseilsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conseils"
        component={Conseils}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormulaireBotaniste"
        component={FormulaireBotaniste}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const MainNavigator = ({ handleLogout }) => {
  const { isTabBarVisible } = useContext(TabBarContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#5DB075',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: Platform.OS === 'ios' ? 5 : 5,
        },
        tabBarStyle: {
          display: isTabBarVisible ? 'flex' : 'none',
          position: 'absolute',
          height: 65,
          bottom: 0,
          borderTopWidth: 0,
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Annonces') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'PhotosStack') {
            return null; // Hide icon for PhotosStack
          } else if (route.name === 'ConseilsStack') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return Ionicons component with iconName and color
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Annonces"
        component={Annonces}
        options={{
          title: 'Annonces',
          header: () => <Header title="Annonces" />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Messages',
          header: () => <Header title="Messages" />,
        }}
      />
      <Tab.Screen
        name="PhotosStack"
        component={PhotosStack}
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.cameraButton} {...props}>
              <Ionicons name="camera" size={32} color="#5DB075" />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ConseilsStack"
        component={ConseilsStack}
        options={{
          title: 'Conseils',
          header: () => <Header title="Conseils" />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          title: 'Profil',
          header: () => <Header title="Profil" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
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
