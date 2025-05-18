
// RecipeSlice.js

import { createSlice } from '@reduxjs/toolkit';
import API from "../../utils/axios";

const initialState = {
  recipes: [],
  status: 'idle',
  error: null,
  newRecipeAdded: false,  // Flag to track if a new recipe is added
};

export const recipeSlice = createSlice({

  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
        console.log('helo')
        console.log("Action Payload:", action.payload); // Check the payload being dispatched
        state.recipes = action.payload; // This should update the recipes state
        console.log("Updated Recipes in Redux:", state.recipes); // Check the updated state
        state.status = 'succeeded';
      },
      
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setNewRecipeAdded: (state) => {
      state.newRecipeAdded = true;  
    },
    resetNewRecipeFlag: (state) => {
      state.newRecipeAdded = false;  // Reset the flag after fetching
    }
  },
});

export const { setRecipes, setLoading, setError, setNewRecipeAdded, resetNewRecipeFlag } = recipeSlice.actions;

// Selector to access the flag for a new recipe
export const selectNewRecipeAdded = (state) => state.recipes.newRecipeAdded;

// Async thunk to fetch recipes from the API
export const fetchRecipes = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await API.get("/recipes/getAllRecipes");
    dispatch(setRecipes(response.data.data)); 
    dispatch(resetNewRecipeFlag());  // Reset the new recipe flag after successful fetch
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addRecipe = (newRecipe) => async (dispatch, getState) => {
  try {
    const response = await API.post("/recipes/save", newRecipe);

    if (!response.data) {
      console.error("No data returned from API.");
      return;
    }

    // ✅ Use safe fallback
    const currentRecipes = getState().recipes?.recipes || [];
    const updatedRecipes = [...currentRecipes, response.data];

    console.log('Updated Recipes:', updatedRecipes);

    dispatch(setRecipes(updatedRecipes));
    dispatch(setNewRecipeAdded());

  } catch (error) {
    console.error("Error while adding recipe:", error);
  }
};

  
export default recipeSlice.reducer;