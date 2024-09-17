import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, CartState } from "../type";
import { getToken } from "@/components/SecureStore/SecureStore";

export const fetchCart = createAsyncThunk<CartItem[]>(
  "cart/fetchCart",
  async () => {
    const token = await getToken();
    const response = await axios.get<CartItem[]>(
      "https://aist.mobi/shop/cart/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  }
);

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCart.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      }
    );
  },
});

export default cartSlice.reducer;
