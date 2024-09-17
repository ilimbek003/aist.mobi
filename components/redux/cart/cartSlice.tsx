import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCart } from "../get/getRequest";

interface CartItem {
  id: number;
  title: string;
  price: number;
  preview_img: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
  itemQuantities: Record<number, number>;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
  itemQuantities: {},
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.itemQuantities = state.items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {} as Record<number, number>);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.itemQuantities[item.id] = action.payload.quantity;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.totalCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },
    setItemQuantities: (
      state,
      action: PayloadAction<Record<number, number>>
    ) => {
      state.itemQuantities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.itemQuantities = state.items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {} as Record<number, number>);
    });
  },
});

export const { setCartItems, updateItemQuantity, setItemQuantities } =
  cartSlice.actions;

export default cartSlice.reducer;
