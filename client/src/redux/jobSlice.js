const { createSlice } = require("@reduxjs/toolkit");

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
  },
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
