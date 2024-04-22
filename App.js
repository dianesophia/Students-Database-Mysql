  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import Home from './screens/home'; 
  import AddPage from './screens/AddPage';
  import UpdatePage from './screens/UpdatePage';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  const Stack = createStackNavigator();

  export default function App() {
    return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add Page" component={AddPage}/>
        <Stack.Screen name="Update Page" component={UpdatePage}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }

