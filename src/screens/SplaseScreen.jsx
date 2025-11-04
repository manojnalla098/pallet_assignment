import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, AppState } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStart } from '../redux/authSlice/authSlice';
import { loadCartFromStorage } from '../redux/cartSice/CartActions';
import { loadWishlistFromStorage } from '../redux/wishlistSlice/WishlistAction';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const displayData = async () => {
      try {
        const user = await AsyncStorage.getItem('token');
        const currentUser = user ? JSON.parse(user) : null;

        if (currentUser) {
          dispatch(loginStart(currentUser));
          setTimeout(() => {
            navigation.navigate('home');
          }, 500);
        } else {
          setTimeout(() => {
            navigation.navigate('login');
          }, 1000);
        }
      } catch (error) {
        setTimeout(() => {
          navigation.navigate('login');
        }, 1500);
      }
    };

    displayData();
  }, [dispatch, navigation]);

  useEffect(() => {
    dispatch(loadCartFromStorage());
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        // Reload or refresh necessary data
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#531a86" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Text style={styles.logoName}>Pallet E-Commerce</Text>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#531a86',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoName: {
    fontSize: responsiveFontSize(4.5),
    color: '#fff',
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
