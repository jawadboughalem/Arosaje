import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const getIcon = (theme) => {
  const iconSize = 20;
  const iconColor = '#077B17';

  switch (theme) {
    case 'Entretien Général':
      return <MaterialCommunityIcons name="flower" size={iconSize} color={iconColor} />;
    case 'Plantes d\'intérieur':
      return <Ionicons name="leaf" size={iconSize} color={iconColor} />;
    case 'Plantes d\'extérieur':
      return <FontAwesome5 name="tree" size={iconSize} color={iconColor} />;
    case 'Hydroponie':
      return <Ionicons name="water" size={iconSize} color={iconColor} />;
    case 'Plantes Aromatiques':
      return <FontAwesome5 name="seedling" size={iconSize} color={iconColor} />;
    case 'Jardinage Urbain':
      return <MaterialIcons name="location-city" size={iconSize} color={iconColor} />;
    default:
      return <Ionicons name="help-circle" size={iconSize} color={iconColor} />;
  }
};

const CardConseil = ({ conseil, isBotanist, onDelete }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {getIcon(conseil.Theme)}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{conseil.Titre}</Text>
        <Text style={styles.description}>{conseil.Description}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "red" : "gray"} />
        </TouchableOpacity>
        {isBotanist && (
          <TouchableOpacity onPress={() => onDelete(conseil)}>
            <Ionicons name="trash-outline" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardConseil;
