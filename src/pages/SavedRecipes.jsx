
// import { useEffect, useState } from "react";
// import API from "../utils/axios"; 

// const SavedRecipes = ({ likedRecipes }) => {
//   const [fullRecipes, setFullRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFullRecipes = async () => {
//       try {
//         if (!likedRecipes || likedRecipes.length === 0) {
//           setFullRecipes([]);
//           setLoading(false);
//           return;
//         }

//         const recipeDetailsPromises = likedRecipes.map((recipeId) =>
//           API.get(`/recipes/getRecipeById/${recipeId}`) 
//         );

//         const recipeResponses = await Promise.all(recipeDetailsPromises);
//         const recipes = recipeResponses.map((response) => response.data.data);
//         setFullRecipes(recipes);
//       } catch (err) {
//         setError("Failed to fetch recipe details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFullRecipes();
//   }, [likedRecipes]); 

//   if (loading) return <p className="text-center text-gray-500">Loading recipes...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">📌 Saved Recipes</h2>

//       {fullRecipes.length === 0 ? (
//         <div className="text-center text-gray-500 flex flex-col items-center gap-2 mt-10">
//           <span className="text-6xl">🍽️</span>
//           <p className="text-lg">No saved recipes yet</p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
//           {fullRecipes.map((recipe) => (
//             <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img
//                 src={recipe.image || 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D'}
//                 alt={recipe.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{recipe.title}</h3>
//                 <p className="text-gray-600 text-sm truncate">{recipe.description}</p>
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
import API from "../utils/axios";

const SavedRecipes = ({ likedRecipes }) => {
  const [fullRecipes, setFullRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infoMessage, setInfoMessage] = useState(null); // ✅ soft message instead of error

  useEffect(() => {
    const fetchFullRecipes = async () => {
      try {
        if (!likedRecipes || likedRecipes.length === 0) {
          setFullRecipes([]);
          setLoading(false);
          return;
        }

        const recipeDetailsPromises = likedRecipes.map((recipeId) =>
          API.get(`/recipes/getRecipeById/${recipeId}`).catch(() => null) // ✅ catch individual errors
        );

        const recipeResponses = await Promise.all(recipeDetailsPromises);

        const validRecipes = recipeResponses
          .filter(res => res && res.data && res.data.data)
          .map(res => res.data.data);

        setFullRecipes(validRecipes);

        // ✅ Show soft message if some or all recipes were not found
        if (validRecipes.length === 0) {
          setInfoMessage("No recipes found in database.");
        } else if (validRecipes.length < likedRecipes.length) {
          setInfoMessage("Some recipes couldn't be loaded.");
        }
      } catch (err) {
        setInfoMessage("Something went wrong while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchFullRecipes();
  }, [likedRecipes]);

  if (loading) return <p className="text-center text-gray-500">Loading recipes...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📌 Saved Recipes</h2>

      {/* ✅ Soft Message if needed */}
      {infoMessage && (
        <p className="text-center text-yellow-600 mb-4">{infoMessage}</p>
      )}

      {fullRecipes.length === 0 ? (
        <div className="text-center text-gray-500 flex flex-col items-center gap-2 mt-10">
          <span className="text-6xl">🍽️</span>
          <p className="text-lg">No saved recipes yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {fullRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={
                  recipe.image ||
                  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=60"
                }
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-gray-600 text-sm truncate">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
