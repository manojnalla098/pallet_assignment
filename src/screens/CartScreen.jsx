import { BackHandler, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import EmptyCart from './CartScreen/EmptyCart';
import FilCart from './CartScreen/FilCart';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const { CartItems } = useSelector(state => state.cart, shallowEqual);

  useEffect(() => {
    const handleBackButtonClick = () => {
      navigation.navigate('home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => backHandler.remove();
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('home');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <>
      {CartItems?.length === 0 ? (
        <>
          <EmptyCart />
        </>
      ) : (
        <>
          <FilCart />
        </>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
