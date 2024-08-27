import React from 'react'
import Card from '../../components/Card'
import {expect, jest, test} from '@jest/globals';
import { IPV4 } from '../../Backend/config/config'
import { render } from '@testing-library/react-native'


describe('Test rendu card', () => {
    test('Nom plante', () => {
        const {getByText, getByTestId} = render(<Card 
            plantImage = 'deb37913-e162-4b58-ac5c-f79e0417e621.webp'
            plantName = 'Acacia'
            location= 'Paris, Ile-de-France , 75001'
            status= 'Disponible'
            userName= 'Bou'
            userImage= 'NULL'
        />
        );

        expect(getByText('Acacia')).toBeTruthy();
        expect(getByText('Paris, Ile-de-France , 75001')).toBeTruthy();
        expect(getByText('Disponible')).toBeTruthy();
        expect(getByText('Bou')).toBeTruthy();


        const plantImage = getByTestId('plantImage');
        expect(plantImage.props.source.uri).toBe('http://' +IPV4+':3000/annonces/image/deb37913-e162-4b58-ac5c-f79e0417e621.webp');

        const userImage = getByTestId('userImage');
        expect(userImage.props.source.uri).toBe('NULL');
        
    })
})