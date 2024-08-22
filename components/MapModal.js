import React from 'react';
import { View, StyleSheet, Modal, Button } from 'react-native';
import MapView from 'react-native-maps';

const MapModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapModal;
