import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Baseurl =
  'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/product/v2/filter/product';

const initialState = {
  producttotal: [],
  productLoading: true,
  isProductAvailable: false,
  currentPage: 1,
};

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (page = 1, thunkAPI) => {
    try {
      const body = {
        page: String(page),
        pageSize: '10',
        sort: {
          creationDateSortOption: 'DESC',
        },
      };

      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-internal-call': 'true',
      };

      const response = await axios.post(Baseurl, body, { headers });
      return { data: response.data, page };
    } catch (error) {
      console.log(
        '❌ Product API Error:',
        error.response ? error.response.data : error.message,
      );
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  },
);

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProducts: state => {
      state.producttotal = [];
      state.currentPage = 1;
    },
    updateCartQuantities: (state, action) => {
      const cartItems = action.payload;
      state.producttotal = state.producttotal.map(product => {
        const cartItem = cartItems.find(
          i => String(i.ProductId) === String(product.id),
        );
        return {
          ...product,
          cart_Quentity: cartItem ? cartItem.cart_Quentity : 0,
        };
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProduct.pending, state => {
        state.productLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        const { data, page } = action.payload;

        if (page === 1) {
          state.producttotal = data?.data?.data;
        } else {
          state.producttotal = [...state.producttotal, ...data?.data?.data];
        }

        state.productLoading = false;
        state.isProductAvailable = true;
        state.currentPage = page;

        AsyncStorage.setItem('producttotal', JSON.stringify(state.producttotal))
          .then(() => console.log('✅ Products cached in AsyncStorage'))
          .catch(err => console.log('AsyncStorage Error:', err));
      })
      .addCase(getProduct.rejected, state => {
        state.productLoading = false;
        state.isProductAvailable = false;
      });
  },
});

export const { resetProducts, updateCartQuantities } = ProductSlice.actions;
export default ProductSlice.reducer;
