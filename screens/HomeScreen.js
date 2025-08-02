import { StackActions } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleLogout = async () => {
    try {
      // To ensure all user-specific data is cleared, we can clear the entire AsyncStorage.
      // This is a simple approach for this app. For more complex apps, 
      // you might want to selectively remove items.
      await AsyncStorage.clear();
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Password Saver</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Feather name="log-out" size={24} color="#c0392b" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity
          style={[styles.card, styles.addCard]}
          onPress={() => navigation.navigate('AddPassword')}
        >
          <Feather name="plus-circle" size={40} color="#fff" />
          <Text style={styles.cardText}>Add New Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.viewCard]}
          onPress={() => navigation.navigate('ViewPasswords')}
        >
          <Feather name="eye" size={40} color="#fff" />
          <Text style={styles.cardText}>View Saved Passwords</Text>
        </TouchableOpacity>
      </Animated.View>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addCard: {
    backgroundColor: '#3498db',
  },
  viewCard: {
    backgroundColor: '#2ecc71',
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
  },
});

export default HomeScreen;