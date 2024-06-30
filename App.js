import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

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
import FormulaireBotaniste from './screens/FormulaireBotaniste'; // Assurez-vous que le chemin est correct

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

const MainNavigator = () => {
  const { isTabBarVisible } = useContext(TabBarContext);

  return (
    <Tab.Navigator
      screenOptions={{
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
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          borderTopWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
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
              source={require('./assets/home.png')}
              style={{ width: 40, height: 38, tintColor: color }}
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
              source={require('./assets/message.png')}
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
        name="ConseilsStack"
        component={ConseilsStack}
        options={{
          title: 'Conseils',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('./assets/plante.png')}
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
              source={require('./assets/profil.png')}
              style={{ width: 60, height: 60, tintColor: color }}
            />
          ),
          header: () => <Header title="Profil" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            setIsLoggedIn(true);
          } else {
            await AsyncStorage.removeItem('token');
            setIsLoggedIn(false);
            Alert.alert("Session expirée", "Veuillez vous reconnecter.");
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du jeton :', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();

    const interval = setInterval(() => {
      checkToken();
    }, 20000); // Vérifie toutes les 20 secondes

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return null; // ou une vue de chargement si vous préférez
  }

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
            <Stack.Screen name="Main">
              {(props) => <MainNavigator {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarProvider>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    top: 0,
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