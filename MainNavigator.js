import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

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

export default MainNavigator;

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