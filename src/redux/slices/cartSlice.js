import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartCount: 0,
	items: [],
	sumOfCart: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const findItem = state.items.find((item) => action.payload.id === item.id);
			if (findItem) {
				findItem.count += 1;
				state.cartCount += 1;
			} else {
				state.items.push(action.payload);
				state.cartCount += 1;
			}
		},
		addItemCount(state, action) {
			const findItem = state.items.find((item) => action.payload.id === item.id);
			state.cartCount += 1;
			findItem.count++;
		},
		removeItemCount(state, action) {
			const findItem = state.items.find((item) => action.payload.id === item.id);
			if (findItem.count !== 1) {
				state.cartCount -= 1;
				findItem.count--;
			}
		},
		/* getSumOfCart(state, action) {
			const currency = action.payload;
			if (state.items.length !== 0) {
				console.log(state.items.filter((item) => item.currency.symbol === currency.symbol));
			}
		}, */
	},
});

export const { addToCart, addItemCount, removeItemCount, getSumOfCart } = cartSlice.actions;

export default cartSlice.reducer;
