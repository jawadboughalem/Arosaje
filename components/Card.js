import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IPV4 } from '../Backend/config/config';

const Card = ({ plantImage, plantName, location, userName, userImage }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: `http://${IPV4}:3000/annonces/image/${plantImage}` }} style={styles.plantImage} />
            <View style={styles.textContainer}>
                <Text style={styles.plantName}>{plantName}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    plantImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        transform: [{ rotate: '90deg' }], // Ajout de la rotation de 90 degrés
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    plantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    userName: {
        fontSize: 14,
        color: '#666',
    },
});

export default Card;
