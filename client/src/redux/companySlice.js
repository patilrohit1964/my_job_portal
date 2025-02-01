const { createSlice } = require("@reduxjs/toolkit");

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: "",
    employees: [],
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
