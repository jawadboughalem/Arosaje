import React from 'react'
import Card from '../../components/Card'
import { IPV4 } from '../../Backend/config/config'
import { render } from '@testing-library/react-native'


describe('Test rendu card', () => {
    test('Nom plante', () => {
        const {getByText, getByTestId} = render(<Card 
            plantImage = 'deb37913-e162-4b58-ac5c-f79e0417e621.webp'
            plantName = 'Tulipe'
            location= 'SAULX-LES-CHARTREUX, Essonne, 91160'
            status= 'Disponible'
            userName= 'Sjsb'
            userImage= 'user.png'
        />
    );

        expect(getByText('Tulipe')).toBeTruthy();
        expect(getByText('SAULX-LES-CHARTREUX, Essonne, 91160')).toBeTruthy();
        expect(getByText('Disponible')).toBeTruthy();
        expect(getByText('Sjsb')).toBeTruthy();


        const plantImage = getByTestId('plantImage');
        expect(plantImage.props.source.uri).toBe('http://'+IPV4+':3000/annonces/image/deb37913-e162-4b58-ac5c-f79e0417e621.webp');

        const userImage = getByTestId('userImage');
        expect(userImage.props.source.uri).toBe('user.png');
        
    })
})