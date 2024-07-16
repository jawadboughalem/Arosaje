import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IPV4 } from '../Backend/config/config';

const Card = ({ plantImage, plantName, location, userName, userImage, status }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: `http://${IPV4}:3000/annonces/image/${plantImage}` }} style={styles.plantImage} />
            <View style={styles.textContainer}>
                <Text style={styles.plantName}>{plantName}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.status}>{status}</Text>
                <View style={styles.userInfo}>
                    <Image source={{ uri: userImage }} style={styles.userImage} />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        height: 120, 
    },
    plantImage: {
        width: 130, 
        height: '100%',
    },
    textContainer: {
        flex: 1,
        padding: 10, 
        justifyContent: 'center',
    },
    plantName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2,
    },
    status: {
        fontSize: 12,
        color: '#28a745',
        marginBottom: 5,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    userImage: {
        width: 20, 
        height: 20, 
        borderRadius: 10, 
        marginRight: 5,
    },
    userName: {
        fontSize: 12, 
        color: '#666',
    },
});

export default Card;
