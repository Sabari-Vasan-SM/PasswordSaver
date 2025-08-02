import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import PinSetupScreen from './screens/PinSetupScreen';
import PinLoginScreen from './screens/PinLoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddPasswordScreen from './screens/AddPasswordScreen';
import ViewPasswordsScreen from './screens/ViewPasswordsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PinSetup" component={PinSetupScreen} />
          <Stack.Screen name="PinLogin" component={PinLoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
          <Stack.Screen name="ViewPasswords" component={ViewPasswordsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});