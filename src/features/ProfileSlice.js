import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favCountries: localStorage.getItem("favCountries")
      ? JSON.parse(localStorage.getItem("favCountries"))
      : [],
    test: 0,
  },

  reducers: {
    addToFavourite(state, action) {
      if (state.favCountries.includes(action.payload)) return;
      state.favCountries = [...state.favCountries, action.payload];
      state.test = 3;
      localStorage.setItem("favCountries", JSON.stringify(state.favCountries));
    },
    getFavourite(state, action) {
      return state.favCountries.filter((country) =>
        country.include(action.payload)
      );
    },
    clearfavourite(state, action) {
      localStorage.removeItem("favCountries");
      state.favCountries = [];
    },

    removeFromFav(state, action) {
      state.favCountries.splice(state.favCountries.indexOf(action.payload), 1);
      localStorage.setItem("favCountries", JSON.stringify(state.favCountries));
    },
  },
});

export const { addToFavourite, getFavourite, clearfavourite, removeFromFav } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
