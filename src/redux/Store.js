import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice/ProductSlice';
import authReducer from './authSlice/authSlice';
import cartReducer from './cartSice/CartSlice';
import wishlistReducer from './wishlistSlice/WishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
