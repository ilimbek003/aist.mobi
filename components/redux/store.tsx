import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./get/getRequest";
import shoppingCartReducer from "./cart/cartSlice";
import selectedAddressReducer from "./cart/addressesSlice";
import setidAddressReducer from "./cart/orderId";
import searchReducer from "./cart/searchSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    shoppingCart: shoppingCartReducer,
    selectedAddress: selectedAddressReducer,
    setidAddress: setidAddressReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
