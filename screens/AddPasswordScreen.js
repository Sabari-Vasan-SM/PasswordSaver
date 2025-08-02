import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPasswordScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSavePassword = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Please enter both name and password');
      return;
    }

    try {
      // Get existing passwords or create new array
      const existingPasswords = await AsyncStorage.getItem('passwords');
      let passwords = existingPasswords ? JSON.parse(existingPasswords) : [];
      
      // Add new password
      passwords.push({ name, password });
      
      // Save updated passwords
      await AsyncStorage.setItem('passwords', JSON.stringify(passwords));
      
      Alert.alert('Success', 'Password saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Name (e.g., Gmail, Netflix)"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Save Password" onPress={handleSavePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});

export default AddPasswordScreen;