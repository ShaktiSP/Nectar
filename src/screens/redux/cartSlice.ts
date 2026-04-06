import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemWithQty } from '../itemScreen/Cartitem';
import { INITIAL_CART_ITEMS } from '../dashBoardScreen/CartScreen';

interface CartState {
  items: CartItemWithQty[];
}

const initialState: CartState = {
  items: INITIAL_CART_ITEMS,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.qty;
    },
    addItem: (state, action: PayloadAction<CartItemWithQty>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { removeItem, updateQty, addItem } = cartSlice.actions;
export default cartSlice.reducer;