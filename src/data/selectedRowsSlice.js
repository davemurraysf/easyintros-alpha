// selectedRowsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedRowsSlice = createSlice({
  name: 'selectedRows',
  initialState: [],
  reducers: {
    addSelectedRow: (state, action) => {
      console.log("Adding selected row:", action.payload); 
      state.push(action.payload);
    },
    removeSelectedRow: (state, action) => {
      console.log("Removing selected row:", action.payload); 
      return state.filter((rowId) => rowId !== action.payload);
    },
    clearSelectedRows: (state) => {
      return [];
    },
  },
});

export const { addSelectedRow, removeSelectedRow, clearSelectedRows } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;

