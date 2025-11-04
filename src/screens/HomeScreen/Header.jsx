import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/GlobalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { logout } from '../../redux/authSlice/authSlice';
import { cleareCart } from '../../redux/cartSice/CartSlice';
import { cleareWishlist } from '../../redux/wishlistSlice/WishlistSlice';

const Header = ({ searchchange, CartItems }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartCount = 3;

  const [search, setSearch] = useState('');
  const searchChange = e => {
    const result = e.nativeEvent.text.replace(/^\s+/, '');
    setSearch(result);
    searchchange(result);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(cleareCart());
      dispatch(cleareWishlist());
      navigation.replace('login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleLogout,
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headertopBox}>
          <View style={styles.headTopLeftBox}>
            <View style={styles.leftText}>
              <Text style={styles.leftTextC} numberOfLines={2}>
                Pallet E-Commerce
              </Text>
            </View>
          </View>

          <View style={styles.headTopRightBox}>
            <Pressable
              onPress={() => navigation.navigate('Cart')}
              onMagicTap={() => navigation.navigate('Cart')}
            >
              <View style={styles.rightBox}>
                <FontAwesome6 name="cart-shopping" style={styles.righticon} />

                {CartItems?.length > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>
                      {CartItems?.length > 99 ? '99+' : CartItems?.length}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          </View>
          <View style={styles.headTopRightBox}>
            <Pressable onPress={() => showLogoutAlert()}>
              <View style={styles.rightBox}>
                <FontAwesome name="user" style={styles.righticon} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.headerBottomBox}>
          <TextInput
            style={styles.Inputstyle}
            placeholder="Search for product"
            placeholderTextColor="#808080"
            value={search}
            onChange={e => searchChange(e)}
            keyboardType="default"
            autoCapitalize="sentences"
          />
          <AntDesign
            name="barcode"
            style={styles.searchicon}
            onPress={() => navigation.navigate('barcodeScanner')}
          />
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(17),
    backgroundColor: colors.primerycolour,
    borderBottomLeftRadius: responsiveScreenWidth(5),
    borderBottomRightRadius: responsiveScreenWidth(5),
    padding: '4%',
  },
  headertopBox: {
    width: '100%',
    height: responsiveScreenHeight(7),
    flexDirection: 'row',
  },
  headTopLeftBox: {
    width: '60%',
    height: '100%',
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftTextC: {
    fontSize: responsiveFontSize(2.7),
    color: '#fff',
    fontWeight: '800',
    fontStyle: 'italic',
  },
  headTopRightBox: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightBox: {
    width: responsiveScreenWidth(15),
    height: responsiveHeight(7.5),
    borderRadius: responsiveScreenWidth(4),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  righticon: {
    fontSize: responsiveScreenFontSize(3.7),
    color: colors.white,
  },
  badgeContainer: {
    position: 'absolute',
    top: responsiveHeight(0.5),
    right: responsiveWidth(1.5),
    minWidth: responsiveScreenWidth(4.5),
    height: responsiveScreenWidth(4.5),
    borderRadius: responsiveScreenWidth(2.5),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
  leftText: {
    flexDirection: 'row',
  },
  headerBottomBox: {
    width: '100%',
    height: responsiveScreenHeight(5),
    backgroundColor: colors.white,
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(1.7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '0.4%',
    paddingHorizontal: '1.5%',
  },
  searchicon: {
    fontSize: responsiveScreenFontSize(3.7),
    color: colors.primerycolour,
  },
  Inputstyle: {
    fontSize: responsiveScreenFontSize(2),
    color: colors.primerycolour,
    width: '90%',
  },
});
