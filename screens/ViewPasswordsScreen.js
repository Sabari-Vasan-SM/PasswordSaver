import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewPasswordsScreen = ({ navigation }) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const loadPasswords = async () => {
      try {
        const savedPasswords = await AsyncStorage.getItem('passwords');
        if (savedPasswords) {
          setPasswords(JSON.parse(savedPasswords));
        }
      } catch (error) {
        console.error('Failed to load passwords', error);
      }
    };

    loadPasswords();
  }, []);

  const handleClearAll = async () => {
    try {
      await AsyncStorage.removeItem('passwords');
      setPasswords([]);
    } catch (error) {
      console.error('Failed to clear passwords', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Passwords</Text>
      {passwords.length === 0 ? (
        <Text style={styles.emptyText}>No passwords saved yet</Text>
      ) : (
        <>
          <FlatList
            data={passwords}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.passwordItem}>
                <Text style={styles.passwordName}>{item.name}</Text>
                <Text style={styles.passwordValue}>{item.password}</Text>
              </View>
            )}
          />
          <Button title="Clear All" onPress={handleClearAll} color="red" />
        </>
      )}
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  passwordItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  passwordName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordValue: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ViewPasswordsScreen;