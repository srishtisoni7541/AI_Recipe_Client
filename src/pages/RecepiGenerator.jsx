




// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addRecipe } from "../redux/slices/RecipeSlice";
// import API from "../utils/axios";

// const RecipeGenerator = ({ onSaveRecipe }) => {
//   const [ingredients, setIngredients] = useState([]);
//   const [cuisine, setCuisine] = useState("");
//   const [preferences, setPreferences] = useState({
//     servings: "",
//     cookingTime: "",
//   });
//   const [generatedRecipe, setGeneratedRecipe] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch(); // ✅ Redux me data bhejne ke liye

//   useEffect(() => {
//     if (onSaveRecipe) {
//       onSaveRecipe();
//     }
//   }, [generatedRecipe]);

//   const handleIngredientChange = (e) => {
//     setIngredients(e.target.value.split(","));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ingredients.length || !cuisine) {
//       alert("Please provide ingredients and cuisine.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/recipes/generate", {
//         ingredients,
//         cuisine,
//         preferences,
//       });
//       setGeneratedRecipe(data);
//     } catch (error) {
//       console.error("Error generating recipe:", error);
//       alert("Failed to generate recipe!");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleSaveRecipe = async () => {
//     if (!generatedRecipe) return;
  
//     console.log('Dispatching addRecipe with newRecipe:', generatedRecipe); // Add this log
//     try {
//       await dispatch(addRecipe(generatedRecipe));
//       alert("Recipe saved successfully!");
//       setGeneratedRecipe(null);
//       if (onSaveRecipe) onSaveRecipe();
//     } catch (error) {
//       console.error("Error saving recipe:", error);
//       alert("Failed to save recipe!");
//     }
//   };
  
  

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg flex lg:flex-row gap-6">
//       {/* Left Section - Form */}
//       <div className="w-full lg:w-1/2">
//         <h2 className="text-2xl font-bold mb-4">Generate a Recipe</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2">Ingredients (comma-separated):</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="e.g. Chicken, Garlic, Onion"
//             onChange={handleIngredientChange}
//           />

//           <label className="block mb-2">Cuisine:</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="e.g. Italian, Indian"
//             value={cuisine}
//             onChange={(e) => setCuisine(e.target.value)}
//           />

//           <label className="block mb-2">Servings:</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="e.g. 2"
//             onChange={(e) =>
//               setPreferences({ ...preferences, servings: e.target.value })
//             }
//           />

//           <label className="block mb-2">Cooking Time (minutes):</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="e.g. 30"
//             onChange={(e) =>
//               setPreferences({ ...preferences, cookingTime: e.target.value })
//             }
//           />

//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded w-full"
//           >
//             {loading ? "Generating..." : "Generate Recipe"}
//           </button>
//         </form>
//       </div>

//       {/* Right Section - Generated Recipe */}
//       <div className="w-full bg-blue-200 lg:w-1/2 border-l p-3 lg:pl-6">
//         <h3 className="text-xl font-semibold mb-4">Generated Recipe:</h3>
//         <div className="p-4 border rounded h-64 overflow-y-auto">
//           {loading ? (
//             <p className="text-gray-500">Generating recipe...</p>
//           ) : generatedRecipe ? (
//             <div>
//               <p>
//                 <strong>Title:</strong> {generatedRecipe.title}
//               </p>
//               <p>
//                 <strong>Instructions:</strong> {generatedRecipe.instructions}
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-500">No recipe generated yet.</p>
//           )}
//         </div>
//         <button
//           className="mt-4 bg-blue-500 text-white px-2 py-2 rounded"
//           onClick={handleSaveRecipe}
//         >
//           Save Recipe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeGenerator;




import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../redux/slices/RecipeSlice";
import API from "../utils/axios";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML content

const RecipeGenerator = ({ onSaveRecipe }) => {
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [preferences, setPreferences] = useState({
    servings: "",
    cookingTime: "",
  });
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (onSaveRecipe) {
      onSaveRecipe();
    }
  }, [generatedRecipe]);

  const handleIngredientChange = (e) => {
    setIngredients(e.target.value.split(",").map(ingredient => ingredient.trim()));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!ingredients.length || !cuisine) {
  //     alert("Please provide ingredients and cuisine.");
  //     return;
  //   }
  
  //   setLoading(true);
  //   try {
  //     const { data } = await API.post("/recipes/generate", {
  //       ingredients,
  //       cuisine,
  //       preferences,
  //     });
  
  //     console.log("Recipe Data:", data);
  
  //     // Sanitize the recipe data
  //     const sanitizedData = {
  //       ...data,
  //       title: DOMPurify.sanitize(data.title),
  //       // Convert ingredients object to an array and sanitize each ingredient
  //       ingredients: Object.entries(data.ingredients).map(([ingredient, amount]) => 
  //         DOMPurify.sanitize(`${ingredient}: ${amount}`)
  //       ),
  //       // Sanitize instructions
  //       instructions: data.instructions.map((step) => DOMPurify.sanitize(step)),
  //     };
  
  //     setGeneratedRecipe(sanitizedData);
  //   } catch (error) {
  //     console.error("Error generating recipe:", error);
  //     alert(`Failed to generate recipe! ${error.message || ''}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.length || !cuisine) {
      alert("Please provide ingredients and cuisine.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/recipes/generate", {
        ingredients,
        cuisine,
        preferences,
      });

      // Sanitize the recipe data to avoid any security risks if necessary
      const sanitizedTitle = DOMPurify.sanitize(data.title);
      const sanitizedInstructions = DOMPurify.sanitize(data.instructions);

      setGeneratedRecipe({
        ...data,
        title: sanitizedTitle,
        instructions: sanitizedInstructions,
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!generatedRecipe) return;

    console.log('Dispatching addRecipe with newRecipe:', generatedRecipe);
    try {
      await dispatch(addRecipe(generatedRecipe));
      alert("Recipe saved successfully!");
      setGeneratedRecipe(null);
      if (onSaveRecipe) onSaveRecipe();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe!");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row gap-6">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Generate a Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Ingredients (comma-separated):</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="e.g. Chicken, Garlic, Onion"
            onChange={handleIngredientChange}
          />

          <label className="block mb-2">Cuisine:</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="e.g. Italian, Indian"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />

          <label className="block mb-2">Servings:</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            placeholder="e.g. 2"
            onChange={(e) =>
              setPreferences({ ...preferences, servings: e.target.value })
            }
          />

          <label className="block mb-2">Cooking Time (minutes):</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            placeholder="e.g. 30"
            onChange={(e) =>
              setPreferences({ ...preferences, cookingTime: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </form>
      </div>

      {/* Right Section - Generated Recipe */}
      <div className="w-full bg-blue-200 lg:w-1/2 border-l p-3 lg:pl-6">
        <h3 className="text-xl font-semibold mb-4">Generated Recipe:</h3>
        <div className="p-4 border rounded h-64 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500">Generating recipe...</p>
          ) : generatedRecipe ? (
            <div>
              <p>
                <strong>Title:</strong> {generatedRecipe.title}
              </p>
              <p>
                <strong>Instructions:</strong> {generatedRecipe.instructions}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No recipe generated yet.</p>
          )}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-2 py-2 rounded"
          onClick={handleSaveRecipe}
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeGenerator;
