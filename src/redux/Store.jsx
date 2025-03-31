import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../redux/slices/RecipeSlice";
import authReducer from  './slices/AuthSlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
  },
});

export default store;
