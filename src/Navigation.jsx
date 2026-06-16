import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EcranConnexion } from './screens/EcranConnexion';
import { EcranInscription } from './screens/EcranInscription';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={EcranConnexion} />
        <Stack.Screen name="Inscription" component={EcranInscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
