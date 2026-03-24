import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnboardingCompleted: false,
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action) => {
      state.isOnboardingCompleted = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  
  },
});

export const { setOnboardingCompleted, setLoggedIn } = appSlice.actions;
export default appSlice.reducer;