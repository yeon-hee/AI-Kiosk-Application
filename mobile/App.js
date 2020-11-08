/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from "./components/Camera.js"
import GuestVoice from "./components/GuestVoice.js"
import PlaceList from './components/PlaceList'

import {useState} from 'react';
import { PlaceContext, initialState } from './context/PlaceContext';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  const [_place, setPlace] = useState(initialState);
  
  return (
    <PlaceContext.Provider value={{_place, setPlace}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlaceList">
          <Stack.Screen 
            name="PlaceList" 
            component={PlaceList}
            options={{title : 'PlaceList'}}
          />
          <Stack.Screen 
            name="Camera" 
            component={Camera}
            options={{title : 'Camera'}}
          />
          <Stack.Screen 
            name="GuestVoice" 
            component={GuestVoice}
            options={{title:'GuestVoice'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlaceContext.Provider>
  );
};
export default App;
