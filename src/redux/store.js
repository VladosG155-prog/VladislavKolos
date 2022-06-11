import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import headerSlice from './slices/headerSlice';
export const store = configureStore({
	reducer: {
		header: headerSlice,
		cart: cartSlice,
	},
});
