
// const SavedRecipes = ({ likedRecipes }) => {
//   // You don't need useState here anymore because you're passing likedRecipes as a prop
//   console.log(likedRecipes);

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">📌 Saved Recipes</h2>

//       {likedRecipes.length === 0 ? (
//         <p className="text-gray-500">No saved recipes yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {likedRecipes.map((recipe) => (
//             <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{recipe.title}</h3>
//                 <p className="text-gray-600 text-sm">{recipe.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SavedRecipes;





import { useEffect, useState } from "react";
import API from "../utils/axios"; // Assuming you are using axios for API calls

const SavedRecipes = ({ likedRecipes }) => {
  const [fullRecipes, setFullRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullRecipes = async () => {
      try {
        // Assuming likedRecipes is an array of recipe IDs
        const recipeDetailsPromises = likedRecipes.map((recipeId) =>
          API.get(`/recipes/getRecipeById/${recipeId}`) // API endpoint to get full recipe details by ID
        );

        // Wait for all the requests to finish
        const recipeResponses = await Promise.all(recipeDetailsPromises);
        console.log("recipes:",recipeResponses);

        // Extract the recipes from the responses
        const recipes = recipeResponses.map((response) => response.data);
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📌 Saved Recipes</h2>

      {fullRecipes.length === 0 ? (
        <p className="text-gray-500">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {fullRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={recipe.image}
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
