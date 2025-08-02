import { StackActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        navigation.dispatch(StackActions.replace('Home'));
      }
    };
    checkLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === email && userData.password === password) {
          navigation.dispatch(StackActions.replace('PinLogin', { email }));
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No user registered. Please register first.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
    }
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/Sabari-Vasan-SM?tab=repositories');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Designed and developed by Sabarivasan</Text>
        <Button title="GitHub" onPress={openGitHub} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;