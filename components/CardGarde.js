import React, { forwardRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IPV4 } from '../Backend/config/config';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const CardGarde = ({ plantImage, plantName}) => {
    return (
        <View  style={styles.card}>
           <Image source={{ uri: `http://${IPV4}:3000/annonces/image/${plantImage}` }} style={styles.plantImage} />
            <Text style={styles.name}>{plantName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 150,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    image: {
        width: 150,
        height: 120,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CardGarde;
