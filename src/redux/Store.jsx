


import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // LocalStorage use karega
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import recipeReducer from "../redux/slices/RecipeSlice";
import authReducer from "./slices/AuthSlice";

//  Persist Config
const persistConfig = {
  key: "root",
  storage, // LocalStorage use ho raha hai
};

//  Root Reducer with Persist
const rootReducer = combineReducers({
  recipes: recipeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Configure Store
const store = configureStore({
  reducer: persistedReducer,
});

//  Persistor Export
export const persistor = persistStore(store);
export default store;
