import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image, Keyboard, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import { IPV4 } from '../Backend/config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardsPage = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [annonces, setAnnonces] = useState([]);
    const navigation = useNavigation();
    const searchWidth = useRef(new Animated.Value(0)).current;
    const textInputRef = useRef(null);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`http://${IPV4}:3000/annonces/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des annonces');
                }
                const data = await response.json();
                setAnnonces(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        };

        fetchAnnonces();
    }, []);

    const handleSearchPress = () => {
        setIsSearchOpen(true);

        Animated.timing(searchWidth, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            textInputRef.current.focus();
        });
    };

    const handleCloseSearch = () => {
        Keyboard.dismiss();
        setIsSearchOpen(false);
        setSearchText('');

        Animated.timing(searchWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleSearch = () => {
        if (searchText) {
            navigation.navigate('SearchResults', { query: searchText });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {!isSearchOpen && (
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                        <Image
                            source={require('../assets/loupe.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                )}
                <Animated.View style={[styles.searchBar, {
                    width: searchWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['30%', '80%'],
                    }),
                    opacity: searchWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                }]}>
                    <TextInput
                        ref={textInputRef}
                        style={styles.input}
                        placeholder="Rechercher..."
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleCloseSearch}>
                        <Icon name="close-circle" size={20} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <FlatList
                data={annonces}
                keyExtractor={(item) => item.Code_Postes.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DetailPoste', { annonce: item })}
                    >
                        <Card
                            plantImage={`http://${IPV4}:3000/images/${item.photo}`}
                            plantName={item.titre}
                            location={item.localisation}
                            userName={item.userName}
                            userImage={item.userImage}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        height: 160,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    searchButton: {
        position: 'absolute',
        top: 80,
        right: 150,
        padding: 10,
        zIndex: 2,
    },
    searchBar: {
        position: 'absolute',
        top: 85,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#00BFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 38,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 40,
        color: '#fff',
    },
});

export default CardsPage;
