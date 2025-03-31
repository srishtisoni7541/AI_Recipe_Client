import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./slices/recipeSlice";
import authReducer from  './slices/AuthSlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
  },
});

export default store;
