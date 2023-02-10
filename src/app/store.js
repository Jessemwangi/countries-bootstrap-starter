import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/contriesSlice';
import  favouriteSlice  from '../features/ProfileSlice';

export default configureStore({
  reducer: {
    countries: countriesSlice,
    favourite:favouriteSlice,
  },
});
