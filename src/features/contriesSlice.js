import { createSlice } from "@reduxjs/toolkit";
import getAllCountryService from "../services/country";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading:true,
  },

  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state,action){
        state.isLoading = action.payload;
    }
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await getAllCountryService.getAll();
    dispatch(getCountries(countries));
    dispatch(isLoading(false))

  };
};

export const {getCountries,isLoading} = countrySlice.actions;
export default countrySlice.reducer;
