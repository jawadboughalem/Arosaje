import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { IPV4 } = require('../Backend/config/config'); // Assurez-vous que le chemin est correct

const CardsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [userInfo, setUserInfo] = useState({ nom: '', prenom: '' });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`http://${IPV4}:3000/user-info`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserInfo(data);
                    } else {
                        console.error('Error fetching user info:', response.statusText);
                    }
                } catch (error) {
                    console.error('Network error:', error);
                }
            }
        };

        fetchUserInfo();
    }, []);

    const handleSearch = () => {
        if (searchText) {
            navigation.navigate('SearchResults', { query: searchText });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Rechercher..."
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                />
                <Text style={styles.userInfo}>
                    {userInfo.nom} {userInfo.prenom}
                </Text>
            </View>
            <Button title="Rechercher" onPress={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    header: {
        height: 250,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    searchBar: {
        height: 40,
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    userInfo: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CardsPage;
