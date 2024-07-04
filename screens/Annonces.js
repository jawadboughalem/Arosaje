import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CardsPage = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const searchWidth = useRef(new Animated.Value(0)).current;
    const textInputRef = useRef(null);

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
        height: 250,
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
        top: 100,
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
