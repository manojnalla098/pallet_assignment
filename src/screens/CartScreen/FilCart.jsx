import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../global/GlobalStyle';
import CartHeader from './CartHeader';
import CartAddress from './CartAddress';
import CartProducts from './CartProducts';
import BillDetails from './BillDetails';

import { useNavigation } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const FillCart = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const { Netpayable } = useSelector(state => state.cart, shallowEqual);

  const scrollToPosition = () => {
    // scrollViewRef.current.scrollTo({ y: 500, animated: true });
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  return (
    <>
      <View style={styles.fillCartContainer}>
        <CartHeader title="Your Cart" />
        <View style={{ height: responsiveHeight(82) }}>
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            <CartAddress />
            <CartProducts />
            <BillDetails />
          </ScrollView>
        </View>

        <View style={styles.cartBottomBox1}>
          <View style={styles.cartBottomBox1Left}>
            <Text style={styles.cartBottomBox1Price}>₹{Netpayable}</Text>
            <Text
              style={styles.cartBottomBox1PriceText}
              onPress={() => scrollToPosition()}
            >
              View Bill Details
            </Text>
          </View>
          <View style={styles.cartBottomBox1Right}>
            <Pressable
            // onPress={() => navigation.navigate('RevivewSunnery')}
            // onMagicTap={() => navigation.navigate('RevivewSunnery')}
            >
              <View style={styles.cartBottomaddressBox2}>
                <Text style={styles.cartBottomaddressText2}>Checkout</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default FillCart;

const styles = StyleSheet.create({
  fillCartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },

  cartBottomBox: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(12),
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // marginBottom: responsiveHeight(10.7),
  },
  cartBottomBox1: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(10),
    display: 'flex',
    flexDirection: 'row',
  },
  cartBottomBoxBill: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(3),
    backgroundColor: '#eee3ff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartBottomaddressBox: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(9),
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartBottomaddressBox1: {
    width: responsiveScreenWidth(44),
    height: responsiveScreenHeight(6),
    backgroundColor: '#eee3ff',
    borderRadius: responsiveWidth(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBottomaddressBox2: {
    width: responsiveScreenWidth(44),
    height: responsiveScreenHeight(6),
    backgroundColor: colors.primerycolour,
    borderRadius: responsiveWidth(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBottomaddressText1: {
    fontSize: responsiveFontSize(2.5),
    color: colors.primerycolour,
    fontWeight: '700',
  },
  cartBottomaddressText2: {
    fontSize: responsiveFontSize(2.5),
    color: '#eee3ff',
    fontWeight: '700',
  },
  bottoprice: {
    fontSize: responsiveFontSize(1.8),
    color: colors.primerycolour,
    fontWeight: '700',
    paddingHorizontal: responsiveHeight(1.5),
  },
  cartBottomBox1Price: {
    fontSize: responsiveFontSize(2.2),
    color: '#000',
    fontWeight: '700',
    paddingHorizontal: responsiveHeight(1.5),
  },
  cartBottomBox1PriceText: {
    fontSize: responsiveFontSize(1.6),
    color: colors.primerycolour,
    fontWeight: '700',
    paddingHorizontal: responsiveHeight(1.5),
  },
  cartBottomBox1Left: {
    width: '50%',
    height: '100%',
    paddingHorizontal: responsiveWidth(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cartBottomBox1Right: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
