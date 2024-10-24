import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Switch, Alert, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { IPV4 } = require('../Backend/config/config');

export default function Sign() {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        isBotanist: false,
        botanistKey: '',
    });
    
    const [errors, setErrors] = useState({});
    const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Etat pour le modal de la charte de confidentialité
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false); // Etat pour savoir si l'utilisateur a accepté la charte

    useFocusEffect(
        React.useCallback(() => {
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                isBotanist: false,
                botanistKey: '',
            });
            setErrors({});
        }, [])
    );

    const validateEmail = useCallback((email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }, []);

    const validatePassword = useCallback((password) => {
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return password.length >= 8 && hasNumber.test(password) && hasSpecialChar.test(password);
    }, []);

    const showAlert = (message) => {
        Alert.alert(
            "Erreur",
            message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    };

    const handleSignUp = async () => {
        const validationErrors = {};
        if (!formData.name.trim()) validationErrors.name = "Le nom est requis.";
        if (!formData.surname.trim()) validationErrors.surname = "Le prénom est requis.";
        if (!formData.email.trim()) {
            validationErrors.email = "L'email est requis.";
        } else if (!validateEmail(formData.email)) {
            validationErrors.email = "L'email n'est pas valide.";
            showAlert("L'email n'est pas valide.");
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Le mot de passe est requis.";
        } else if (!validatePassword(formData.password)) {
            validationErrors.password = "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.";
            showAlert("Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.");
        }

        if (formData.isBotanist && formData.botanistKey !== BOTANIST_SECRET_KEY) {
            validationErrors.botanistKey = "La clé botaniste est incorrecte.";
            showAlert("La clé botaniste est incorrecte.");
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Ouvrir la charte de confidentialité avant de continuer
        setShowPrivacyModal(true);
    };

    const handlePrivacyAccept = async () => {
        setShowPrivacyModal(false);
        setIsPrivacyAccepted(true);
    
        // Procéder à l'inscription après l'acceptation de la charte
        try {
            const response = await fetch(`http://${IPV4}:3000/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name, 
                    surname: formData.surname,
                    email: formData.email,
                    password: formData.password,
                    isBotanist: formData.isBotanist,
                }),
            });
    
            if (!response.ok) {
                console.error('Erreur lors de l\'inscription:', response.statusText);
                throw new Error('Erreur lors de l\'inscription');
            }
    
            const data = await response.json();
            console.log('Inscription réussie. ID utilisateur:', data.userId);
            Alert.alert("Inscription réussie", "Votre compte a été créé avec succès.", [
                { text: "OK", onPress: () => navigation.navigate('Login') } 
            ]);
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'inscription.");
        }
    };    

    const handlePrivacyDecline = () => {
        setShowPrivacyModal(false);
        setIsPrivacyAccepted(false);
        Alert.alert("Inscription annulée", "Vous devez accepter la charte de confidentialité pour continuer.");
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
                        <TextInput 
                            placeholder="Nom" 
                            style={styles.input} 
                            value={formData.name} 
                            onChangeText={(text) => setFormData({ ...formData, name: text })} 
                        />
                        <TextInput 
                            placeholder="Prénom" 
                            style={styles.input} 
                            value={formData.surname} 
                            onChangeText={(text) => setFormData({ ...formData, surname: text })} 
                        />
                        <TextInput 
                            placeholder="Email" 
                            style={styles.input} 
                            value={formData.email} 
                            onChangeText={(text) => setFormData({ ...formData, email: text })} 
                            keyboardType="email-address" 
                            autoCapitalize="none" 
                        />
                        <TextInput 
                            placeholder="Mot de passe" 
                            style={styles.input} 
                            value={formData.password} 
                            onChangeText={(text) => setFormData({ ...formData, password: text })} 
                            secureTextEntry 
                            autoCapitalize="none" 
                        />

                        {formData.isBotanist && (
                            <TextInput 
                                placeholder="Code Botaniste" 
                                style={styles.input} 
                                value={formData.botanistKey} 
                                onChangeText={(text) => setFormData({ ...formData, botanistKey: text })} 
                                keyboardType="numeric" 
                                maxLength={5} 
                            />
                        )}

                        <View style={styles.switchContainer}>
                            <Text>Êtes-vous un botaniste?</Text>
                            <Switch 
                                value={formData.isBotanist} 
                                onValueChange={(value) => setFormData({ ...formData, isBotanist: value })} 
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Inscription</Text>
                        </TouchableOpacity>
                        <Text style={styles.switchText}>
                            Vous avez déjà un compte?{' '}
                            <Text style={styles.switchLink} onPress={() => navigation.navigate('Login')}>
                                Se connecter
                            </Text>
                        </Text>
                    </View>

                    {/* Modal de la charte de confidentialité */}
                    <Modal
                        visible={showPrivacyModal}
                        transparent={true}
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Charte de Confidentialité</Text>
                                <ScrollView style={styles.modalBody}>
                                    <Text>Nous récupérons certaines données pour améliorer votre expérience utilisateur, comme l'email et d'autres informations.</Text>
                                    <Text>Ces informations ne seront pas partagées sans votre consentement, et vous pouvez refuser à tout moment.</Text>
                                    <Text>En acceptant, vous permettez à l'application d'utiliser ces données pour personnaliser les services.</Text>
                                </ScrollView>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButtonDecline} onPress={handlePrivacyDecline}>
                                        <Text style={styles.modalButtonText}>Refuser</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButtonAccept} onPress={handlePrivacyAccept}>
                                        <Text style={styles.modalButtonText}>Accepter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#077B17',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 53,
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
    formTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 40,
    },    
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajoute un fond sombre semi-transparent
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5, // Pour ajouter une ombre sur Android
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#077B17',
    },
    modalBody: {
        maxHeight: 300, // Limite la hauteur du corps pour un défilement
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButtonAccept: {
        backgroundColor: '#077B17',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    modalButtonDecline: {
        backgroundColor: '#FF6347',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
