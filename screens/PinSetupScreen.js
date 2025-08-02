import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PinSetupScreen = ({ navigation, route }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { email, password } = route.params;

  const handlePinSetup = async () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    try {
      // Store user data and PIN
      await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
      await AsyncStorage.setItem('userPin', pin);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      Alert.alert('Error', 'Failed to save PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your 4-digit PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm PIN"
        value={confirmPin}
        onChangeText={setConfirmPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />
      <Button title="Submit" onPress={handlePinSetup} />
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

export default PinSetupScreen;