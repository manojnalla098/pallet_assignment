import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../global/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.emptyCartContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/emptycart.png')}
            style={styles.imageView}
          />
        </View>
        <Text style={styles.Emptycart}>Your cart is getting lonely</Text>
        <Text style={styles.Emptycart1}>Fill it up with all things good!</Text>
        <Pressable
          style={styles.shopingButton}
          onPress={() => navigation.navigate('home')}
          onMagicTap={() => navigation.navigate('home')}
        >
          <Text style={styles.Emptybuttontext}>Continue	Shopping</Text>
        </Pressable>
      </View>
    </>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  emptyCartContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(100),
    marginTop: responsiveHeight(4.5),
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: responsiveScreenHeight(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: '100%',
    height: '100%',
  },
  Emptycart: {
    fontSize: responsiveFontSize(3.5),
    color: colors.primerycolour,
    fontWeight: '700',
  },
  Emptycart1: {
    fontSize: responsiveFontSize(1.7),
    color: colors.primerycolour,
    fontWeight: '500',
    marginVertical: responsiveHeight(0.5),
  },

  shopingButton: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(7),
    backgroundColor: '#eee3ff',
    marginVertical: responsiveHeight(5),
    borderRadius: responsiveWidth(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Emptybuttontext: {
    fontSize: responsiveFontSize(2.7),
    color: colors.primerycolour,
    fontWeight: '700',
  },
});
