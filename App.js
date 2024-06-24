import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import TabBarContext, { TabBarProvider } from './components/TabBarContext';

import Bienvenue from './screens/Bienvenue';
import Sign from './screens/Sign';
import Login from './screens/Login';
import Header from './components/header';
import Annonces from './screens/Annonces';
import Messages from './screens/Messages';
import Photos from './screens/Photos';
import Conseils from './screens/Conseils';
import Profil from './screens/Profil';
import CameraPreview from './screens/CameraPreview';
import Formulaire from './screens/Formulaire';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PhotosStack() {
  const { setIsTabBarVisible } = useContext(TabBarContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{
          header: () => <Header title="Photos" />,
          tabBarVisible: false,
        }}
        listeners={{
          focus: () => setIsTabBarVisible(false),
          blur: () => setIsTabBarVisible(true),
        }}
      />
      <Stack.Screen
        name="CameraPreview"
        component={CameraPreview}
        options={{
          header: () => <Header title="Nouvelle plante" />,
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
          header: () => <Header title="Nouveau post" />,
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <TabBarProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Bienvenue" component={Bienvenue} />
              <Stack.Screen name="Sign" component={Sign} />
              <Stack.Screen name="Login">
                {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarProvider>
  );
}

const MainNavigator = () => {
  const { isTabBarVisible } = useContext(TabBarContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5DB075',
        tabBarLabelStyle: {
          fontSize: 12, // Augmenté pour meilleure visibilité
          fontWeight: '500',
          paddingBottom: Platform.OS === 'ios' ? 5 : 10, // Ajout de padding pour iOS et Android
        },
        tabBarStyle: {
          display: isTabBarVisible ? 'flex' : 'none',
          position: 'absolute',
          height: 70, // Augmenté pour meilleure visibilité
          bottom: 0, // Relever la barre de navigation
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          borderTopWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 10 : 15, // Ajout de padding pour iOS et Android
        },
      }}
    >
      <Tab.Screen
        name="Annonces"
        component={Annonces}
        options={{
          title: 'Annonces',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? require('./assets/home.png') : require('./assets/home.png')}
              style={{ width: 38, height: 38, tintColor: color }}
            />
          ),
          header: () => <Header title="Annonces" />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? require('./assets/message.png') : require('./assets/message.png')}
              style={{ width: 55, height: 55, tintColor: color }}
            />
          ),
          header: () => <Header title="Messages" />,
        }}
      />
      <Tab.Screen
        name="PhotosStack"
        component={PhotosStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => null,
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.cameraButton}
              {...props}
            >
              <Image source={require('./assets/camera3.gif')} style={{ width: 60, height: 60, top: -12 }} />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Conseils"
        component={Conseils}
        options={{
          title: 'Conseils',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? require('./assets/plante.png') : require('./assets/plante.png')}
              style={{ width: 32, height: 38, tintColor: color }}
            />
          ),
          header: () => <Header title="Conseils" />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? require('./assets/profil.png') : require('./assets/profil.png')}
              style={{ width: 60, height: 60, tintColor: color }}
            />
          ),
          header: () => <Header title="Profil" />,
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    top: 0, // Ajustez cette valeur pour abaisser le bouton
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
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


