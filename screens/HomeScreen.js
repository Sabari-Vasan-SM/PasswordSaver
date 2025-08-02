import { StackActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userData', 'userPin']);
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Saver</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Password"
          onPress={() => navigation.navigate('AddPassword')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Saved Passwords"
          onPress={() => navigation.navigate('ViewPasswords')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#f44336" />
      </View>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default HomeScreen;