import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state, acion) {
      state.isAuthenticated = true;
      state.user = acion.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
