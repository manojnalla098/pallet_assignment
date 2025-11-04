import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, setCartItems } from './CartSlice';
import { updateCartQuantities } from '../productSlice/ProductSlice';

export const addToCartAndPersist = item => async (dispatch, getState) => {
  dispatch(addToCart(item));
  const { cart } = getState();
  await AsyncStorage.setItem('CartItems', JSON.stringify(cart.CartItems));
};

export const loadCartFromStorage = () => async dispatch => {
  const storedCart = await AsyncStorage.getItem('CartItems');
  if (storedCart) {
    const parsed = JSON.parse(storedCart);
    dispatch(setCartItems(parsed));
    dispatch(updateCartQuantities(parsed));
  }
};
