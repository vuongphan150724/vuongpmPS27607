import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listSP: [],
  },
  reducers: {
    themSP: (state, action) => {
      let sp = action.payload;
      let index = state.listSP.findIndex(s => s.id === sp.id);
      if (index === -1) {
        sp['so_luong'] = 1;
        state.listSP.push(sp);
      } else {
        state.listSP[index]['so_luong']++;
      }
    },
    suaSL: (state, action) => {
      let [id, so_luong] = action.payload;
      let index = state.listSP.findIndex(s => s.id === id);
      if (index !== -1) {
        state.listSP[index].so_luong = Number(so_luong);
      }
    },
    xoaSP: (state, action) => {
      let id = action.payload;
      const index = state.listSP.findIndex(s => s.id === id);
      if (index !== -1) {
        state.listSP.splice(index, 1);
      }
    },
    xoaGH: state => {
      state.listSP = [];
    },
  },
});

export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;
export default cartSlice.reducer;
