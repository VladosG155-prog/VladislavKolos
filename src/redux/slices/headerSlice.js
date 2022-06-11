import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: 'all',
	currency: {
		symbol: '$',
		label: 'USD',
	},
};

const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		changeCategory(state, action) {
			state.category = action.payload;
		},
		changeCurrency(state, action) {
			state.currency.symbol = action.payload.symbol;
			state.currency.label = action.payload.label;
		},
	},
});

export const { changeCategory, changeCurrency } = headerSlice.actions;

export default headerSlice.reducer;
