import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const ViewPasswordsScreen = ({ navigation }) => {
  const [passwords, setPasswords] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPasswords();
    });

    loadPasswords();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    return unsubscribe;
  }, [navigation, fadeAnim]);

  const loadPasswords = async () => {
    try {
      const savedPasswords = await AsyncStorage.getItem('passwords');
      if (savedPasswords) {
        setPasswords(JSON.parse(savedPasswords));
      } else {
        setPasswords([]);
      }
    } catch (error) {
      console.error('Failed to load passwords', error);
    }
  };

  const handleCopyPassword = (password) => {
    Clipboard.setStringAsync(password);
    Alert.alert('Copied', 'Password copied to clipboard.');
  };

  const handleDeletePassword = (index) => {
    Alert.alert(
      'Delete Password',
      'Are you sure you want to delete this password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const newPasswords = [...passwords];
              newPasswords.splice(index, 1);
              await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
              setPasswords(newPasswords);
            } catch (error) {
              console.error('Failed to delete password', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Passwords',
      'Are you sure you want to delete all saved passwords?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('passwords');
              setPasswords([]);
            } catch (error) {
              console.error('Failed to clear passwords', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.passwordItem,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.passwordInfo}>
        <Text style={styles.appName}>{item.appName}</Text>
        <Text style={styles.passwordName}>{item.name}</Text>
        <Text style={styles.passwordValue}>{item.password}</Text>
      </View>
      <View style={styles.passwordActions}>
        <TouchableOpacity onPress={() => handleCopyPassword(item.password)}>
          <Feather name="copy" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePassword(index)} style={{ marginLeft: 15 }}>
          <Feather name="trash-2" size={24} color="#c0392b" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Passwords</Text>
        {passwords.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Feather name="trash-2" size={24} color="#c0392b" />
          </TouchableOpacity>
        )}
      </View>

      {passwords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="lock" size={60} color="#bdc3c7" />
          <Text style={styles.emptyText}>No passwords saved yet.</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddPassword')}
          >
            <Text style={styles.addButtonText}>Add Your First Password</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: '#7f8c8d',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordInfo: {
    flex: 1,
  },
  passwordActions: {
    flexDirection: 'row',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  passwordName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  passwordValue: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});

export default ViewPasswordsScreen;