
import { useEffect, useState } from "react";
import API from "../utils/axios"; 

const SavedRecipes = ({ likedRecipes }) => {
  const [fullRecipes, setFullRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullRecipes = async () => {
      try {
        // Assuming likedRecipes is an array of recipe IDs
        const recipeDetailsPromises = likedRecipes.map((recipeId) =>
          API.get(`/recipes/getRecipeById/${recipeId}`) 
        );

        // Wait for all the requests to finish
        const recipeResponses = await Promise.all(recipeDetailsPromises);
        console.log("recipes:",recipeResponses);

        // Extract the recipes from the responses
        const recipes = recipeResponses.map((response) =>response.data.data);
        setFullRecipes(recipes);
      } catch (err) {
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFullRecipes();
  }, [likedRecipes]); // This will run when likedRecipes changes

  if (loading) return <p className="text-center text-gray-500">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📌 Saved Recipes</h2>

      {fullRecipes.length === 0 ? (
        <p className="text-gray-500">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {fullRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={recipe.image || 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D'}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-gray-600 text-sm">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
