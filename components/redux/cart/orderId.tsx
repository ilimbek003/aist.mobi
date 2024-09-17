import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface idState {
  order_id: number | null;
  basket_id: number | null;
}

const initialState: idState = {
  order_id: null,
  basket_id: null,
};

interface idAddressPayload {
  order_id: number;
  basket_id: number;
}

const idSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setidAddress(state, action: PayloadAction<idAddressPayload>) {
      state.order_id = action.payload.order_id;
      state.basket_id = action.payload.basket_id;
    },
  },
});

export const { setidAddress } = idSlice.actions;
export default idSlice.reducer;
