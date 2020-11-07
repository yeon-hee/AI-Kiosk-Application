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

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './store/modules';

const store = createStore(rootReducer);
console.log('appjs에서 스토어생성확인: ')
console.log(store.getState());

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
export default App;
