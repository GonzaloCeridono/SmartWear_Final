import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { persistCart } from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

persistCart(store);

export default store;
