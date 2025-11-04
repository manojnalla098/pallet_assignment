import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EmptyCart from './CartScreen/EmptyCart';
import FilCart from './CartScreen/FilCart';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const CartScreen = () => {
  const { CartItems } = useSelector(state => state.cart, shallowEqual);
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
