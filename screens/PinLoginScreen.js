import { StackActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PinLoginScreen = ({ navigation, route }) => {
  const [pin, setPin] = useState('');
  const { email } = route.params;

  const handlePinLogin = async () => {
    try {
      const storedPin = await AsyncStorage.getItem('userPin');
      
      if (pin === storedPin) {
        navigation.dispatch(StackActions.replace('Home'));
      } else {
        Alert.alert('Error', 'Incorrect PIN');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 4-digit PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />
      <Button title="Login" onPress={handlePinLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    textAlign: 'center',
    fontSize: 18,
  },
});

export default PinLoginScreen;