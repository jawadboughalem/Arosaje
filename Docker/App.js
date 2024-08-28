const React = require('react');
const { NavigationContainer } = require('@react-navigation/native');
const { createStackNavigator } = require('@react-navigation/stack');
const AsyncStorage = require('@react-native-async-storage/async-storage');
const jwt_decode = require('jwt-decode');
const { Alert } = require('react-native');

const { TabBarProvider } = require('./components/TabBarContext');
const Bienvenue = require('./screens/Bienvenue');
const Sign = require('./screens/Sign');
const Login = require('./screens/Login');
const MainNavigator = require('./MainNavigator');



const Stack = createStackNavigator();

module.exports = App;
function App() {
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