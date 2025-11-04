import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    CartItems: [],
    TotalMrp: 0,
    TotalPrice: 0,
    Netpayable: 0,
    Cartloading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.CartItems.findIndex(
        item => item?.ProductId === action.payload?.ProductId,
      );

      if (itemIndex >= 0) {
        const currentItem = state.CartItems[itemIndex];
        currentItem.cart_Quentity += 1;

        currentItem.Product_total_Mrp =
          currentItem.Mrp * currentItem.cart_Quentity;
        currentItem.Product_total_Price =
          currentItem.Price * currentItem.cart_Quentity;
        currentItem.Product_total_Saving =
          currentItem.Product_total_Mrp - currentItem.Product_total_Price;
      } else {
        const newItem = {
          ...action.payload,
          cart_Quentity: 1,
          Product_total_Mrp: action.payload.Mrp,
          Product_total_Price: action.payload.Price,
          Product_total_Saving: action.payload.Mrp - action.payload.Price,
        };
        state.CartItems.push(newItem);
      }

      const totalMrp = state.CartItems.reduce(
        (sum, item) => sum + item.Product_total_Mrp,
        0,
      );

      const totalPrice = state.CartItems.reduce(
        (sum, item) => sum + item.Product_total_Price,
        0,
      );

      state.TotalMrp = parseFloat(totalMrp.toFixed(2));
      state.TotalPrice = parseFloat(totalPrice.toFixed(2));
      state.Netpayable = parseFloat(state.TotalPrice.toFixed(2));
      state.Cartloading = !state.Cartloading;
    },
    decrementCart: (state, action) => {
      const itemIndex = state.CartItems.findIndex(
        item => item?.ProductId === action.payload?.ProductId,
      );

      if (itemIndex >= 0) {
        const currentItem = state.CartItems[itemIndex];
        if (currentItem.cart_Quentity === 1) {
          state.CartItems = state.CartItems.filter(
            item => item.ProductId !== action.payload.ProductId,
          );
        } else {
          currentItem.cart_Quentity -= 1;

          currentItem.Product_total_Mrp =
            currentItem.Mrp * currentItem.cart_Quentity;
          currentItem.Product_total_Price =
            currentItem.Price * currentItem.cart_Quentity;
          currentItem.Product_total_Saving =
            currentItem.Product_total_Mrp - currentItem.Product_total_Price;
        }

        const totalMrp = state.CartItems.reduce(
          (sum, item) => sum + item.Product_total_Mrp,
          0,
        );

        const totalPrice = state.CartItems.reduce(
          (sum, item) => sum + item.Product_total_Price,
          0,
        );

        state.TotalMrp = parseFloat(totalMrp.toFixed(2));
        state.TotalPrice = parseFloat(totalPrice.toFixed(2));
        state.Netpayable = parseFloat(state.TotalPrice.toFixed(2));

        state.Cartloading = !state.Cartloading;
      }

      AsyncStorage.setItem('CartItems', JSON.stringify(state.CartItems));
    },
    removefromCart(state, action) {
      const nextCartItems = state.CartItems.filter(
        cartItem => cartItem.ProductId !== action.payload.ProductId,
      );
      state.CartItems = nextCartItems;
      state.Cartloading = !state.Cartloading;
      AsyncStorage.setItem('CartItems', JSON.stringify(state.CartItems));
    },
    cleareCart(state, action) {
      state.CartItems = [];
      state.Cartloading = !state.Cartloading;
      AsyncStorage.setItem('CartItems', JSON.stringify(state.CartItems));
    },

    setCartItems: (state, action) => {
      state.CartItems = action.payload;
      const totalMrp = state.CartItems.reduce(
        (sum, item) => sum + item.Product_total_Mrp,
        0,
      );

      const totalPrice = state.CartItems.reduce(
        (sum, item) => sum + item.Product_total_Price,
        0,
      );

      state.TotalMrp = parseFloat(totalMrp.toFixed(2));
      state.TotalPrice = parseFloat(totalPrice.toFixed(2));
      state.Netpayable = parseFloat(state.TotalPrice.toFixed(2));
    },
  },
});

export const {
  addToCart,
  setCartItems,
  decrementCart,
  removefromCart,
  cleareCart,
} = cartSlice.actions;
export default cartSlice.reducer;
