import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../global/GlobalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { addToCartAndPersist } from '../../redux/cartSice/CartActions';
import { decrementCart } from '../../redux/cartSice/CartSlice';
import {
  addToWishlist,
  removefromWishlist,
} from '../../redux/wishlistSlice/WishlistSlice';

const SingleProduct = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const addtoCatPress = async () => {
    const cart_form = {
      ProductName: product?.title,
      ProductId: product?.productId,
      thumbnail: 'https://kiranaworld.in/Admin/Products/Desktop/3008338.jpg',
      Mrp: Number(100),
      Price: Number(100),
      Product_total_Mrp: Number(100) * 1,
      Product_total_Price: Number(100) * 1,
      Product_total_Saving: (Number(100) * 1 - Number(100) * 1).toFixed(2),
      Discount: Number(1),
      cart_Quentity: 1,
    };
    console.log(cart_form, 'cart_form');

    const cart = await dispatch(addToCartAndPersist(cart_form));
  };
  const decrementtoCatPress = async () => {
    const cart_form = {
      ProductName: product?.title,
      ProductId: product?.productId,
      thumbnail: 'https://kiranaworld.in/Admin/Products/Desktop/3008338.jpg',
      Mrp: Number(100),
      Price: Number(100),
      Product_total_Mrp: Number(100) * 1,
      Product_total_Price: Number(100) * 1,
      Product_total_Saving: (Number(100) * 1 - Number(100) * 1).toFixed(2),
      Discount: Number(1),
      cart_Quentity: 1,
    };
    const cart = await dispatch(decrementCart(cart_form));
  };

  const addtoWishlistPress = async () => {
    const cart_form = {
      ProductId: product?.productId,
      wishStatus: true,
    };
    const cart = await dispatch(addToWishlist(cart_form));
  };
  const removetoWishlistPress = async () => {
    const cart_form = {
      ProductId: product?.productId,
      wishStatus: false,
    };
    const cart = await dispatch(removefromWishlist(cart_form));
  };

  return (
    <>
      <View style={styles.ProductBox}>
        <View style={styles.wishlistBox}>
          {product?.wishStatus ? (
            <>
              <FontAwesome
                name="heart"
                style={styles.wishActive}
                onPress={() => removetoWishlistPress()}
              />
            </>
          ) : (
            <>
              <FontAwesome
                name="heart-o"
                style={styles.wishInActive}
                onPress={() => addtoWishlistPress()}
              />
            </>
          )}
        </View>
        <Pressable
          onPress={() => navigation.navigate('ProductInfo', product)}
          onMagicTap={() => navigation.navigate('ProductInfo', product)}
        >
          <View style={styles.ProductImageBox}>
            {loading && (
              <>
                <View style={styles.indicatorIcon}>
                  <ActivityIndicator
                    size="small"
                    color={colors.primerycolour}
                    style={styles.loader}
                  />
                </View>
              </>
            )}

            <FastImage
              style={styles.imageView}
              source={{
                uri: 'https://kiranaworld.in/Admin/Products/Desktop/3008338.jpg',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              onLoadEnd={() => setLoading(false)}
            />
          </View>
        </Pressable>
        <Text
          style={styles.ProductText}
          numberOfLines={2}
          onPress={() => navigation.navigate('ProductInfo', product)}
        >
          {product?.title}
        </Text>
        <Text style={styles.ProductTextPack} numberOfLines={1}>
          {product?.shortDescription}
        </Text>

        <View style={styles.cardMainBox}>
          <View style={styles.cardMainValuePriceBox}>
            {/* <Text style={styles.ProductTextMrp} numberOfLines={1}>
              {product?.discountPercentage} %
            </Text> */}
            <Text style={styles.ProductTextPrice} numberOfLines={1}>
              ₹ 100
            </Text>
          </View>
          {product?.cart_Quentity === 0 ? (
            <>
              <View style={styles.cardMainValueCartBox}>
                <Pressable onPress={() => addtoCatPress()}>
                  <View style={styles.ProductCartContainer}>
                    <Text style={styles.ProductTextAddtoCart}>Add </Text>
                  </View>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <View style={styles.ProductCartContainerValue}>
                <Pressable
                  style={styles.cartAddition}
                  onPress={() => addtoCatPress()}
                >
                  <Entypo name="plus" style={styles.IconstyleActive} />
                </Pressable>
                <View style={styles.cartValue}>
                  <Text style={styles.IconstyleActive}>
                    {product?.cart_Quentity}
                  </Text>
                </View>
                <Pressable
                  style={styles.cartRemove}
                  onPress={() => decrementtoCatPress()}
                >
                  <Entypo name="minus" style={styles.IconstyleActive} />
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  ProductBox: {
    width: responsiveScreenWidth(45.5),
    height: responsiveScreenHeight(36),
    // backgroundColor: "red",
    marginHorizontal: responsiveScreenWidth(1),
    position: 'relative',
  },
  ProductImageBox: {
    width: '100%',
    height: responsiveScreenHeight(20),
    backgroundColor: '#eee3ff',
    borderRadius: responsiveWidth(4),
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  indicatorIcon: {
    width: '100%',
    height: responsiveScreenHeight(20),
    // backgroundColor: 'pink',
    // backgroundColor: '#eee3ff',
    borderRadius: responsiveWidth(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveWidth(4),
  },
  ProductText: {
    fontSize: responsiveFontSize(1.8),
    color: colors.primerycolour,
    fontWeight: '600',
    marginVertical: responsiveHeight(0.5),
    letterSpacing: responsiveWidth(0.03),
    height: responsiveHeight(4.5),
  },
  ProductTextPack: {
    fontSize: responsiveFontSize(1.5),
    color: colors.primerycolour,
  },
  ProductTextPrice: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    // marginVertical: responsiveHeight(0.5),
    fontWeight: '600',
  },

  ProductTextMrp: {
    fontSize: responsiveFontSize(1.6),
    color: colors.primerycolour,
    fontWeight: '400',
    // marginHorizontal: responsiveWidth(0.5),
    textDecorationLine: 'line-through',
  },
  ProductCartContainer: {
    width: responsiveScreenWidth(22),
    height: responsiveScreenHeight(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: colors.primerycolour,
    borderRadius: responsiveWidth(1),
  },

  ProductTextAddtoCart: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '700',
  },

  ProductCartContainerValue: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: colors.primerycolour,
    borderRadius: responsiveWidth(1),
    flexDirection: 'row',
  },
  cartAddition: {
    width: '30%',
    height: '100%',
    backgroundColor: '#eee3ff',
    borderTopLeftRadius: responsiveWidth(1),
    borderBottomLeftRadius: responsiveWidth(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartRemove: {
    width: '30%',
    height: '100%',
    backgroundColor: '#eee3ff',
    borderTopRightRadius: responsiveWidth(1),
    borderBottomRightRadius: responsiveWidth(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartValue: {
    width: '40%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconstyleActive: {
    fontSize: responsiveFontSize(2.1),
    color: colors.primerycolour,
    fontWeight: '700',
  },

  cardMainBox: {
    width: '100%',
    height: responsiveScreenHeight(4.5),
    display: 'flex',
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
  },
  cardMainValuePriceBox: {
    width: '40%',
    height: responsiveScreenHeight(4.5),
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(1),
  },
  cardMainValueCartBox: {
    width: '60%',
    height: responsiveScreenHeight(4.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistBox: {
    position: 'absolute',
    right: responsiveWidth(2),
    top: responsiveHeight(1),
    width: responsiveWidth(8),
    height: responsiveHeight(3.5),
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishActive: {
    fontSize: responsiveFontSize(3),
    color: 'red',
  },
  wishInActive: {
    fontSize: responsiveFontSize(3),
    color: 'yellow',
  },
});
