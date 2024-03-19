import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AvailableGridColors } from '../dto/Grid';

const initialState: { gridColor: AvailableGridColors } = {
  gridColor: 'bg-gray-600',
};

// Step 3: Define the slice
export const gridColorSlice = createSlice({
  name: 'gridColor',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<AvailableGridColors>) => {
      state.gridColor = action.payload;
    },
  },
});

export const { setColor } = gridColorSlice.actions;

export default gridColorSlice.reducer;
