import AsyncStorage from '@react-native-async-storage/async-storage';
import { setWishlist } from './WishlistSlice';

export const loadWishlistFromStorage = () => async dispatch => {
  const storedWishlist = await AsyncStorage.getItem('Wishlist');
  if (storedWishlist) {
    const parsed = JSON.parse(storedWishlist);
    dispatch(setWishlist(parsed));
  }
};
