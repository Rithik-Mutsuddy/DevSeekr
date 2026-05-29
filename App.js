import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EcranAccueilPrincipal from './src/screens/EcranAccueilPrincipal';
import EcranFavoris from './src/screens/EcranFavoris';
import EcranDetails from './src/screens/EcranDetails';
import EcranProfil from './src/screens/EcranProfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EcranAccueilPrincipal" component={EcranAccueilPrincipal} />
        <Stack.Screen name="EcranFavoris" component={EcranFavoris} />
        <Stack.Screen name="EcranDetails" component={EcranDetails} />
        <Stack.Screen name="EcranProfil" component={EcranProfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
