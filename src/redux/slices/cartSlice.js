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
			findItem.count--;
			state.cartCount -= 1;
			if (findItem.count <= 1) {
				state.items = state.items.filter((item) => item.id !== findItem.id);
			}
		},
	},
});

export const { addToCart, addItemCount, removeItemCount } = cartSlice.actions;

export default cartSlice.reducer;
