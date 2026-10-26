import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

export type CartItem = { book: Book; qty: number };

type CartState = { items: CartItem[] };

const slice = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    addToCart: (s, a: PayloadAction<Book>) => {
      const found = s.items.find((i) => i.book.id === a.payload.id);
      if (found) found.qty += 1;
      else s.items.push({ book: a.payload, qty: 1 });
    },
    removeFromCart: (s, a: PayloadAction<number>) => {
      s.items = s.items.filter((i) => i.book.id !== a.payload);
    },
    clearCart: (s) => {
      s.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = slice.actions;
export default slice.reducer;
