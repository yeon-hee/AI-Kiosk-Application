import { createContext } from 'react';

export const PlaceContext = createContext();

export const initialState = {
    address: '',
    id: 0,
    name: '',
    phone: '',
};