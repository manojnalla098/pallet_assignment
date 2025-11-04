import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  Wishlist: [],
  wishlistloading: true,
};

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const findOptionId = state.Wishlist.find(
        item => item.ProductId === action.payload.ProductId,
      );
      if (!findOptionId) {
        const tempProducts = action.payload;
        state.Wishlist.push(tempProducts);
      }
      state.wishlistloading = !state.wishlistloading;
      AsyncStorage.setItem('Wishlist', JSON.stringify(state.Wishlist));
    },
    removefromWishlist(state, action) {
      const nextCartItems = state.Wishlist.filter(
        cartItem => cartItem.ProductId !== action.payload.ProductId,
      );
      state.Wishlist = nextCartItems;
      state.wishlistloading = !state.wishlistloading;
      AsyncStorage.setItem('Wishlist', JSON.stringify(state.Wishlist));
    },
    setWishlist(state, action) {
      state.Wishlist = action.payload;
    },
    cleareWishlist(state, action) {
      state.Wishlist = [];
      AsyncStorage.setItem('Wishlist', JSON.stringify(state.Wishlist));
    },
  },
});

export const {
  addToWishlist,
  removefromWishlist,
  setWishlist,
  cleareWishlist,
} = WishlistSlice.actions;
export default WishlistSlice.reducer;
