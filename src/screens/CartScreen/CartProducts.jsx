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
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addToCartAndPersist } from '../../redux/cartSice/CartActions';
import { decrementCart, removefromCart } from '../../redux/cartSice/CartSlice';

const CartProducts = () => {
  const dispatch = useDispatch();
  const { CartItems } = useSelector(state => state.cart, shallowEqual);

  const addtoCatPress = async cart_form => {
    const cart = await dispatch(addToCartAndPersist(cart_form));
  };
  const decrementtoCatPress = async cart_form => {
    const cart = await dispatch(decrementCart(cart_form));
  };
  const removetoCatPress = async cart_form => {
    const cart = await dispatch(removefromCart(cart_form));
  };

  return (
    <>
      <View style={styles.cartProdContainer}>
        <Text style={styles.optionName}>Cart Items</Text>
        {CartItems &&
          CartItems?.map((cart, index) => (
            <>
              <View style={styles.cartProdBox} key={index}>
                <View style={styles.cartProdImageBox}>
                  <Image
                    source={{ uri: cart?.thumbnail }}
                    style={styles.imageView}
                  />
                </View>
                <View style={styles.cartProdTextBox}>
                  <Text style={styles.cartProductTextPack} numberOfLines={2}>
                    {cart?.ProductName}
                  </Text>
                  {/* <Text style={styles.cartProductTextotion} numberOfLines={1}>
                    1 kg
                  </Text> */}
                  <Text style={styles.cartProductTextPack} numberOfLines={1}>
                    ₹{cart?.Product_total_Price}
                  </Text>
                </View>
                <View style={styles.cartProdValuBox}>
                  <View style={styles.optionaddtocartValue}>
                    <Pressable
                      style={styles.optionRemove}
                      onPress={() => decrementtoCatPress(cart)}
                    >
                      <Entypo name="minus" style={styles.optionIcon} />
                    </Pressable>
                    <Pressable style={styles.optionValue}>
                      <Text style={styles.optionValueText}>
                        {cart?.cart_Quentity}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.optionaddition}
                      onPress={() => addtoCatPress(cart)}
                    >
                      <Entypo name="plus" style={styles.optionIcon} />
                    </Pressable>
                  </View>
                  <Pressable
                    style={styles.removeBox}
                    onPress={() => removetoCatPress(cart)}
                  >
                    <Feather name="trash-2" style={styles.trashIcon} />
                  </Pressable>
                </View>
              </View>
            </>
          ))}
      </View>
    </>
  );
};

export default CartProducts;

const styles = StyleSheet.create({
  cartProdContainer: {
    width: responsiveScreenWidth(100),
    padding: responsiveWidth(2),
  },
  optionName: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '700',
    marginVertical: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(3),
  },
  cartProdBox: {
    width: '100%',
    height: responsiveScreenHeight(9),
    display: 'flex',
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.3),
  },
  cartProdImageBox: {
    width: '25%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartProdTextBox: {
    width: '50%',
    height: '100%',
  },
  cartProdValuBox: {
    width: '25%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: '90%',
    height: '90%',
  },
  cartProductTextPack: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '600',
  },
  cartProductTextotion: {
    fontSize: responsiveFontSize(1.6),
    color: colors.primerycolour,
    fontWeight: '500',
    marginVertical: responsiveHeight(0.2),
  },
  optionaddtocartValue: {
    width: responsiveScreenWidth(22),
    height: responsiveScreenHeight(3.2),
    // backgroundColor: colors.primerycolour,

    // borderColor: colors.primerycolour,
    // borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionaddition: {
    width: '33.3%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primerycolour,
    borderRadius: responsiveWidth(1),
  },
  optionValue: {
    width: '33.3%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRemove: {
    width: '33.3%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfbfbf',
    borderRadius: responsiveWidth(1),
  },
  optionIcon: {
    fontSize: responsiveFontSize(2.1),
    color: colors.white,
    fontWeight: '700',
  },

  optionValueText: {
    fontSize: responsiveFontSize(2.1),
    color: 'gray',
    fontWeight: '700',
  },
  removeBox: {
    width: '100%',
    height: responsiveHeight(3.5),
    marginTop: responsiveHeight(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashIcon: {
    fontSize: responsiveFontSize(2.5),
    color: '#000',
  },
});
