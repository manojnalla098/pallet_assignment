import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  BackHandler,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { colors } from '../global/GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { addToCartAndPersist } from '../redux/cartSice/CartActions';
import { decrementCart } from '../redux/cartSice/CartSlice';
import {
  addToWishlist,
  removefromWishlist,
} from '../redux/wishlistSlice/WishlistSlice';

const ProductInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const { CartItems, Netpayable } = useSelector(store => store.cart);
  const { Wishlist } = useSelector(store => store.wishlist);

  const [productifo, setProductinfo] = useState('');
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageList = [images[images.length - 1], ...images, images[0]];
  const scrollRef = useRef(null);

  const isInWishlist = useMemo(() => {
    if (!route?.params?.id || !Array.isArray(Wishlist)) return false;
    return Wishlist.some(
      item => String(item.ProductId) === String(route.params.id),
    );
  }, [Wishlist, route?.params?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: width, animated: false });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!route?.params) return;
    const updatedProduct = route.params;
    const cartItem = CartItems?.find(
      item => String(item.ProductId) === String(updatedProduct.id),
    );

    const productWithQty = {
      ...updatedProduct,
      cart_Quentity: cartItem ? cartItem.cart_Quentity : 0,
    };

    setProductinfo(productWithQty);
    setImages(route.params?.images || []);
  }, [route?.params, CartItems]);

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);

    // Handle infinite looping
    if (index === 0) {
      // Swiped left from first → jump to last real image
      scrollRef.current.scrollTo({
        x: width * images.length,
        animated: false,
      });
      setActiveIndex(images.length - 1);
    } else if (index === images.length + 1) {
      // Swiped right from last → jump to first real image
      scrollRef.current.scrollTo({ x: width, animated: false });
      setActiveIndex(0);
    } else {
      setActiveIndex(index - 1);
    }
  };

  const addtoCatPress = async () => {
    const originalMRP = (
      Number(productifo?.price) /
      (1 - Number(productifo?.discountPercentage) / 100)
    ).toFixed(2);
    const cart_form = {
      ProductName: productifo?.title,
      ProductId: productifo?.id,
      thumbnail: productifo?.images[0],
      Mrp: Number(productifo?.price),
      Price: Number(productifo?.price),
      Product_total_Mrp: Number(productifo?.price) * 1,
      Product_total_Price: Number(productifo?.price) * 1,
      Product_total_Saving: (
        Number(productifo?.price) * 1 -
        Number(productifo?.price) * 1
      ).toFixed(2),
      Discount: Number(productifo?.discountPercentage),
      cart_Quentity: 1,
    };
    const cart = await dispatch(addToCartAndPersist(cart_form));
  };
  const decrementtoCatPress = async () => {
    const originalMRP = (
      Number(productifo?.price) /
      (1 - Number(productifo?.discountPercentage) / 100)
    ).toFixed(2);
    const cart_form = {
      ProductName: productifo?.title,
      ProductId: productifo?.id,
      thumbnail: productifo?.images[0],
      Mrp: Number(productifo?.price),
      Price: Number(productifo?.price),
      Product_total_Mrp: Number(productifo?.price) * 1,
      Product_total_Price: Number(productifo?.price) * 1,
      Product_total_Saving: (
        Number(productifo?.price) * 1 -
        Number(productifo?.price) * 1
      ).toFixed(2),
      Discount: Number(productifo?.discountPercentage),
      cart_Quentity: 1,
    };
    const cart = await dispatch(decrementCart(cart_form));
  };

  const addtoWishlistPress = async () => {
    const cart_form = {
      ProductId: productifo?.id,
      wishStatus: true,
    };
    const cart = await dispatch(addToWishlist(cart_form));
  };
  const removetoWishlistPress = async () => {
    const cart_form = {
      ProductId: productifo?.id,
      wishStatus: false,
    };
    const cart = await dispatch(removefromWishlist(cart_form));
  };

  const shareToWhatsApp = async () => {
    try {
      if (!productifo?.images[0]) {
        Alert.alert('Error', 'No image found.');
        return;
      }

      const imageUrl = productifo?.images[0];
      const fileName = `share_${Date.now()}.jpg`;
      const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: filePath,
      }).promise;

      if (downloadResult.statusCode !== 200) {
        throw new Error('Failed to download image');
      }

      const shareOptions = {
        title: productifo?.title,
        message: `${productifo?.title}\nCheck this out: ${productifo?.slug}\nVisit our website: https://google.com`,
        url: `file://${filePath}`,
        social: Share.Social.WHATSAPP,
      };
      await Share.shareSingle(shareOptions);
    } catch (error) {}
  };

  return (
    <>
      <View style={styles.categoryContainer}>
        <View style={styles.infoHeader}>
          <View style={styles.infoHeaderLeft}>
            <Pressable
              style={styles.infoHeaderLeftBox}
              onPress={() => navigation.navigate('home')}
              onMagicTap={() => navigation.navigate('home')}
            >
              <FontAwesome6
                name="arrow-left-long"
                style={styles.IconstyleHeader}
              />
            </Pressable>
          </View>
          <View style={styles.infoHeaderRighr}>
            <View style={styles.infoHeaderRighrBox}>
              {isInWishlist ? (
                <>
                  <Pressable
                    style={styles.infoHeaderLeftBox}
                    onPress={() => removetoWishlistPress()}
                  >
                    <AntDesign name="heart" style={styles.IconstyActleHeader} />
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    style={styles.infoHeaderLeftBox}
                    onPress={() => addtoWishlistPress()}
                  >
                    <FontAwesome6 name="heart" style={styles.IconstyleHeader} />
                  </Pressable>
                </>
              )}

              <Pressable
                style={styles.infoHeaderLeftBox}
                onPress={() => shareToWhatsApp()}
              >
                <Feather name="share-2" style={styles.IconstyleHeader} />
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imagecontainer}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEventThrottle={16}
            >
              {imageList.map((img, index) => (
                <View style={styles.imageBox} key={index}>
                  <Image
                    source={{ uri: img }}
                    style={styles.imageView}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>

            {/* Dots Indicator */}
            <View style={styles.dotContainer}>
              {images?.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: index === activeIndex ? '#000' : '#ccc',
                    },
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.ProductText} numberOfLines={2}>
              {productifo?.title}
            </Text>
            <Text style={styles.ProductTextPack} numberOfLines={1}>
              {productifo?.category?.name}
            </Text>
            <View style={styles.pricecontainer}>
              <View style={styles.cardMainValuePriceBox}>
                {/* <Text style={styles.ProductTextMrp} numberOfLines={1}>
                  {productifo?.discountPercentage} %
                </Text> */}
                <Text style={styles.ProductTextPrice} numberOfLines={1}>
                  ₹ {productifo?.price}
                </Text>
              </View>
              {productifo?.cart_Quentity === 0 ? (
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
                  <View style={styles.cardMainValueCartBox}>
                    <View style={styles.ProductCartContainerValue}>
                      <Pressable
                        style={styles.cartAddition}
                        onPress={() => addtoCatPress()}
                      >
                        <Entypo name="plus" style={styles.IconstyleActive} />
                      </Pressable>
                      <View style={styles.cartValue}>
                        <Text style={styles.IconstyleActive}>
                          {productifo?.cart_Quentity}
                        </Text>
                      </View>
                      <Pressable
                        style={styles.cartRemove}
                        onPress={() => decrementtoCatPress()}
                      >
                        <Entypo name="minus" style={styles.IconstyleActive} />
                      </Pressable>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          <View>
            <View style={styles.cartProdContainer}>
              <Text style={styles.optionName}>Product Description</Text>
            </View>
            <View style={styles.descContainer}>
              <View style={styles.descContainerBOx}>
                <Text style={styles.DescriptionTest}>
                  {productifo?.description}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginBottom: responsiveHeight(8) }}></View>
        </ScrollView>
        <View style={styles.categoryBottom}>
          <View style={styles.categoryBottomBox}>
            <Text style={styles.categoryBottomText}>
              {CartItems?.length} Item | ₹ {Netpayable}
            </Text>
            <Text
              style={styles.categoryBottomText}
              onPress={() => navigation.navigate('Cart')}
            >
              <FontAwesome5
                name="shopping-bag"
                style={styles.cartIconstyleActive}
              />
              {'  '}
              View Cart
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    position: 'relative',
  },

  categoryBottom: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: responsiveHeight(1),
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryBottomBox: {
    width: responsiveWidth(95),
    height: responsiveHeight(7),
    backgroundColor: colors.primerycolour,
    borderRadius: responsiveWidth(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
  },
  imageView: {
    width: '100%',
    height: '100%',
  },
  categoryBottomText: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    fontWeight: '700',
    padding: responsiveWidth(2),
  },

  infoHeader: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    // backgroundColor: "#eee3ff",
    position: 'absolute',
    top: 3.4,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 999,
  },
  infoHeaderLeft: {
    width: responsiveWidth(50),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(5),
  },
  infoHeaderLeftBox: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // borderWidth: responsiveWidth(0.1),
    borderBlockColor: '#000',
    elevation: 1,
  },

  infoHeaderRighr: {
    width: responsiveWidth(50),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  infoHeaderRighrBox: {
    width: '55%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  IconstyleHeader: {
    fontSize: responsiveFontSize(3),
    color: colors.primerycolour,
    fontWeight: '700',
  },
  IconstyActleHeader: {
    fontSize: responsiveFontSize(3),
    color: '#ff1a1a',
    fontWeight: '700',
  },
  imagecontainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(57),
    backgroundColor: '#eee3ff',
    paddingTop: responsiveHeight(7),
    position: 'relative',
    // justifyContent: "center",
    alignItems: 'center',
  },

  imageBox: {
    width: responsiveWidth(100),
    height: responsiveHeight(40),
  },
  productDetails: {
    // backgroundColor: "#eee3ff",
    marginTop: responsiveHeight(1),
    padding: '2%',
  },
  ProductText: {
    fontSize: responsiveFontSize(2.4),
    color: colors.primerycolour,
    fontWeight: '700',
    marginHorizontal: responsiveHeight(1),
    letterSpacing: responsiveWidth(0.03),
  },
  ProductTextPack: {
    fontSize: responsiveFontSize(2.1),
    color: colors.primerycolour,
    fontWeight: '400',
    marginHorizontal: responsiveHeight(1),
  },
  pricecontainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    // backgroundColor: "#eee3ff",
    marginTop: responsiveHeight(0.4),
    display: 'flex',
    flexDirection: 'row',
  },
  cardMainValuePriceBox: {
    width: '40%',
    height: responsiveScreenHeight(7),
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(2),
    justifyContent: 'center',
  },
  cardMainValueCartBox: {
    width: '60%',
    height: responsiveScreenHeight(7),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ProductTextMrp: {
    fontSize: responsiveFontSize(2.1),
    color: colors.primerycolour,
    fontWeight: '400',
    // marginHorizontal: responsiveWidth(0.5),
    textDecorationLine: 'line-through',
  },
  ProductTextPrice: {
    fontSize: responsiveFontSize(2.4),
    color: colors.primerycolour,
    // marginVertical: responsiveHeight(0.5),
    fontWeight: '600',
  },
  ProductCartContainer: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: colors.primerycolour,
    borderRadius: responsiveWidth(1),
    marginHorizontal: responsiveWidth(6),
  },
  ProductTextAddtoCart: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '700',
  },
  ProductCartContainerValue: {
    width: responsiveScreenWidth(26),
    height: responsiveScreenHeight(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(0.5),
    borderWidth: 1,
    borderColor: colors.primerycolour,
    borderRadius: responsiveWidth(1),
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(6),
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
  IconstyleActive: {
    fontSize: responsiveFontSize(2.5),
    color: colors.primerycolour,
    fontWeight: '800',
  },
  cartIconstyleActive: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    fontWeight: '800',
  },
  cartValue: {
    width: '40%',
    height: '100%',
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
  cartProdContainer: {
    width: responsiveScreenWidth(95),
  },
  optionName: {
    fontSize: responsiveFontSize(2),
    color: colors.primerycolour,
    fontWeight: '700',
    // marginVertical: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(3),
  },
  beskBox: {
    width: responsiveScreenWidth(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beskBoxContain: {
    width: responsiveScreenWidth(90),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DescriptionTest: {
    fontSize: responsiveFontSize(1.6),
    color: colors.primerycolour,
    fontWeight: '400',
    textAlign: 'justify',
  },
  descContainer: {
    width: responsiveScreenWidth(100),
    padding: responsiveWidth(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descContainerBOx: {
    width: responsiveScreenWidth(90),
    backgroundColor: '#eee3ff',
    borderRadius: responsiveWidth(1.5),
    paddingVertical: responsiveWidth(1.5),
    paddingHorizontal: responsiveWidth(2),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
