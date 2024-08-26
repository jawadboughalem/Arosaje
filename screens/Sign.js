import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Switch,
    Animated,
    Alert
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';  // Importation de Toast pour les alertes
const { IPV4 } = require('../Backend/config/config');

const BOTANIST_SECRET_KEY = '2468'; // Clé secrète du botaniste

export default function Sign() {
    const navigation = useNavigation();

    // Utilisation de useState pour chaque champ
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBotanist, setIsBotanist] = useState(false);
    const [botanistKey, setBotanistKey] = useState('');
    const [errors, setErrors] = useState({});
    const [errorShakeAnimation] = useState(new Animated.Value(0));
    const [botanistAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(botanistAnimation, {
            toValue: isBotanist ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [isBotanist]);

    useFocusEffect(
        React.useCallback(() => {
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setBotanistKey('');
            setIsBotanist(false);
            setErrors({});
        }, [])
    );

    const handleSignUp = async () => {
        const validationErrors = {};
        // Validation des entrées avec gestion des erreurs
        if (!name.trim()) validationErrors.name = "Le nom est requis.";
        if (!surname.trim()) validationErrors.surname = "Le prénom est requis.";
        if (!email.trim()) {
            validationErrors.email = "L'email est requis.";
        } else if (!validateEmail(email)) {
            validationErrors.email = "L'email n'est pas valide.";
            showAlert("L'email n'est pas valide.", 'warning');
        }
        if (!password.trim()) validationErrors.password = "Le mot de passe est requis.";
        if (isBotanist && botanistKey !== BOTANIST_SECRET_KEY) {
            validationErrors.botanistKey = "La clé botaniste est incorrecte.";
            showAlert("La clé botaniste est incorrecte.", 'warning');
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            showAlert("Tous les champs doivent être remplis correctement.", 'error');
            return;
        }

        // Si tout est valide, procéder à l'inscription
        try {
            const response = await fetch(`http://${IPV4}:3000/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    password,
                    isBotanist,
                    botanistKey,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Inscription réussie',
                    text2: 'Votre compte a été créé avec succès.',
                    onHide: () => navigation.navigate('Login')
                });
            } else {
                throw new Error('Erreur lors de l\'inscription');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Une erreur s'est produite lors de l'inscription.",
            });
        }
    };

    // Fonctions supplémentaires comme la gestion du changement de texte et la validation d'email
    const handleTextChange = (setter, field) => (text) => {
        setter(text);
        if (errors[field]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>A’rosa-je</Text>
                        <MaterialCommunityIcons name="flower" size={100} color="black" style={styles.icon} />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Inscription</Text>
                        {/* Champ Nom */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            onChangeText={handleTextChange(setName, 'name')}
                            value={name}
                        />
                        {/* Champ Prénom */}
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            onChangeText={handleTextChange(setSurname, 'surname')}
                            value={surname}
                        />
                        {/* Champ Email */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleTextChange(setEmail, 'email')}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {/* Champ Mot de passe */}
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            onChangeText={handleTextChange(setPassword, 'password')}
                            value={password}
                            secureTextEntry
                        />
                        {/* Interrupteur Botaniste */}
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Êtes-vous un botaniste?</Text>
                            <Switch
                                value={isBotanist}
                                onValueChange={setIsBotanist}
                            />
                        </View>
                        {/* Champ Clé Botaniste */}
                        {isBotanist && (
                            <TextInput
                                style={styles.input}
                                placeholder="Code Botaniste"
                                onChangeText={handleTextChange(setBotanistKey, 'botanistKey')}
                                value={botanistKey}
                            />
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Inscription</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#5DB075',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: Platform.select({ ios: 'Helvetica', android: 'sans-serif-light' }),
    },
    icon: {
        marginVertical: 10,
    },
    formContainer: {
        width: '100%',
        height: '70%', 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 0,
        padding: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    inputError: {
        borderColor: 'red',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#077B17',
        padding: 10,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
    },
    switchText: {
        marginTop: 20,
        color: 'black',
    },
    switchLink: {
        color: '#077B17',
        fontWeight: 'bold',
    },
    botanistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 20,
        position: 'relative',
    },
    botanistInput: {
        padding: 12,
        width: '50%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        textAlign: 'center',
        marginLeft: '20%',
    },       
    closeButton: {
        position: 'absolute',
        right: 5,
        top: '50%',
        marginTop: -10, 
    },
});
