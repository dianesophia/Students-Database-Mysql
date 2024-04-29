  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import Home from './screens/home'; 
  import LoginPage from './screens/LoginPage';
  import SignUpPage from './screens/SignUpPage';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  const Stack = createStackNavigator();

  export default function App() {
    return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login Page" component={LoginPage}/>
        <Stack.Screen name="SignUp Page" component={SignUpPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }

