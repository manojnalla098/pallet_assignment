import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigationState } from '@react-navigation/native';
import Header from './HomeScreen/Header';
import ShowProductColoum from './HomeScreen/ShowProductColoum';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const routes = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1]?.name;

  const { CartItems } = useSelector(store => store.cart);
  const { Wishlist } = useSelector(store => store.wishlist);

  const { producttotal } = useSelector(state => state.product, shallowEqual);

  const [exitApp, setExitApp] = useState(false);
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      setProducts(producttotal);
      setDisplayProducts(producttotal);
      return;
    }
  }, [producttotal, search]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
      setDisplayProducts(filtered);
    }, 400);

    return () => clearTimeout(timer);
  }, [products, search]);

  useEffect(() => {
    if (!products?.length) return;
    const updated = products.map(product => {
      const cartItem = CartItems?.find(
        item => String(item.ProductId) === String(product.id),
      );
      const wishItem = Wishlist?.find(
        item => String(item.ProductId) === String(product.id),
      );

      return {
        ...product,
        cart_Quentity: cartItem ? cartItem.cart_Quentity : 0,
        wishStatus: wishItem ? wishItem.wishStatus : false,
      };
    });
    setProducts(prev => {
      const changed = updated.some((newP, i) => {
        const oldP = prev[i];
        return (
          oldP?.cart_Quentity !== newP.cart_Quentity ||
          oldP?.wishStatus !== newP.wishStatus
        );
      });

      return changed ? updated : prev;
    });

    setDisplayProducts(updated);
  }, [CartItems, Wishlist, products]);

  useEffect(() => {
    if (currentRoute === 'home') {
      const backAction = () => {
        if (exitApp) {
          BackHandler.exitApp();
          return true;
        }

        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        setExitApp(true);

        const timer = setTimeout(() => {
          setExitApp(false);
        }, 2000);

        return () => clearTimeout(timer);
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [exitApp, currentRoute]);

  const searchchange = useCallback(value => {
    setSearch(value);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#531a86" barStyle="light-content" />
      <View style={styles.homeContainer}>
        <View style={styles.HomeMiddleContainer}>
          <Header searchchange={searchchange} CartItems={CartItems} />
          <ShowProductColoum products={displayProducts} />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f0f5f5',
  },
  HomeMiddleContainer: {
    height: responsiveHeight(85),
    width: responsiveWidth(100),
  },
  indicatorIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
