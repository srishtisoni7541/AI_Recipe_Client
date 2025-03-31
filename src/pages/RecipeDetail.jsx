// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import API from "../utils/axios";

// // const RecipeDetail = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [recipe, setRecipe] = useState(null); // Pehle null rakho

// //   useEffect(() => {
// //     const fetchRecipe = async () => {
// //       try {
// //         const response = await API.get(`/recipes/getRecipeById/${id}`);
// //         console.log("data from backend:", response.data.data);
// //         setRecipe(response.data.data);
// //       } catch (error) {
// //         console.error("Error fetching recipe:", error);
// //       }
// //     };

// //     fetchRecipe();
// //   }, [id]);
// //   const HandleDelete=()=>{

// //   }

// //   if (!recipe) {
// //     return <p className="text-center text-gray-500">Loading recipe...</p>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-3xl font-bold text-center">{recipe.title}</h2>
// //       <img
// //         src={recipe.imageUrl || "https://via.placeholder.com/300"}
// //         alt={recipe.title}
// //         className="w-full max-w-md mx-auto my-4 rounded-lg"
// //       />

// //       <h3 className="text-xl font-semibold mt-4">🛒 Ingredients</h3>
// //       <ul className="list-disc pl-6">
// //         {recipe.ingredients.map((ingredientObj, index) => (
// //           <li key={index}>
// //             {Object.entries(ingredientObj).map(([key, value]) => (
// //               <div key={key}>
// //                 {/* ✅ Agar value ek object hai to usko alag render karein */}
// //                 {typeof value === "object" && value !== null ? (
// //                   <div>
// //                     <strong>{key}:</strong>
// //                     <ul className="list-disc pl-4">
// //                       {Object.entries(value).map(([subKey, subValue]) => (
// //                         <li key={subKey}>
// //                           {subKey}: {subValue}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 ) : (
// //                   // ✅ Normal string value ko seedha render karo
// //                   <p>
// //                     <strong>{key}:</strong> {value}
// //                   </p>
// //                 )}
// //               </div>
// //             ))}
// //           </li>
// //         ))}
// //       </ul>

// //       {/* ✅ Instructions List */}
// //       <h3 className="text-xl font-semibold mt-4">📜 Instructions</h3>
// //       <ul className="list-decimal pl-6">
// //         {(recipe.instructions || []).map((step, index) => (
// //           <li key={index}>{step}</li>
// //         ))}
// //       </ul>

// //       {/* ✅ Delete & Go Back Buttons */}
// //       <div className="mt-6 flex gap-4 justify-center">
// //         <button
// //           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
// //           onClick={HandleDelete}
// //         >
// //           Delete Recipe
// //         </button>
// //         <button
// //           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
// //           onClick={() => navigate(-1)}
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RecipeDetail;





// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../utils/axios";

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null); // Pehle null rakho
//   const [loading, setLoading] = useState(false); // Delete ke liye loading state

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await API.get(`/recipes/getRecipeById/${id}`);
//         console.log("data from backend:", response.data.data);
//         setRecipe(response.data.data);
//       } catch (error) {
//         console.error("Error fetching recipe:", error);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   // ✅ Recipe Delete Function
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    
//     setLoading(true); // Button disable karne ke liye
//     try {
//       await API.delete(`/recipes/deleteRecipe/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/home"); // ✅ Delete hone ke baad homepage ya list page pe bhej do
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//       alert("Failed to delete recipe!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!recipe) {
//     return <p className="text-center text-gray-500">Loading recipe...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-center">{recipe.title}</h2>
//       <img
//         src={recipe.imageUrl || "https://via.placeholder.com/300"}
//         alt={recipe.title}
//         className="w-full max-w-md mx-auto my-4 rounded-lg"
//       />

//       <h3 className="text-xl font-semibold mt-4">🛒 Ingredients</h3>
//       <ul className="list-disc pl-6">
//         {recipe.ingredients.map((ingredientObj, index) => (
//           <li key={index}>
//             {Object.entries(ingredientObj).map(([key, value]) => (
//               <div key={key}>
//                 {typeof value === "object" && value !== null ? (
//                   <div>
//                     <strong>{key}:</strong>
//                     <ul className="list-disc pl-4">
//                       {Object.entries(value).map(([subKey, subValue]) => (
//                         <li key={subKey}>
//                           {subKey}: {subValue}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ) : (
//                   <p>
//                     <strong>{key}:</strong> {value}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </li>
//         ))}
//       </ul>

//       {/* ✅ Instructions List */}
//       <h3 className="text-xl font-semibold mt-4">📜 Instructions</h3>
//       <ul className="list-decimal pl-6">
//         {(recipe.instructions || []).map((step, index) => (
//           <li key={index}>{step}</li>
//         ))}
//       </ul>

//       {/* ✅ Delete & Go Back Buttons */}
//       <div className="mt-6 flex gap-4 justify-center">
//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
//           onClick={handleDelete}
//           disabled={loading}
//         >
//           {loading ? "Deleting..." : "Delete Recipe"}
//         </button>
//         <button
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { Loader } from "lucide-react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`/recipes/getRecipeById/${id}`);
        setRecipe(response.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    setLoading(true);
    try {
      await API.delete(`/recipes/deleteRecipe/${id}`);
      alert("Recipe deleted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe!");
    } finally {
      setLoading(false);
    }
  };

  if (!recipe) {
    return <p className="text-center text-gray-500 text-lg animate-pulse">Loading recipe...</p>;
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-gray-200">
      <div className="p-6 max-w-3xl w-full bg-white bg-opacity-90 shadow-xl rounded-2xl border border-gray-300 backdrop-blur-md h-[80vh] overflow-y-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-4">{recipe.title}</h2>
        <h3 className="text-2xl font-semibold mt-4 text-gray-700 border-b pb-2 border-gray-300">🛒 Ingredients</h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2 mt-2">
          {recipe.ingredients.map((ingredientObj, index) => (
            <li key={index} className="mb-2">
              {Object.entries(ingredientObj).map(([key, value]) => (
                <div key={key} className="text-gray-700">
                  {typeof value === "object" && value !== null ? (
                    <div>
                      <strong className="text-gray-800">{key}:</strong>
                      <ul className="list-disc pl-4 text-gray-600">
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <li key={subKey}>
                            {subKey}: {subValue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>
                      <strong className="text-gray-800">{key}:</strong> {value}
                    </p>
                  )}
                </div>
              ))}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mt-6 text-gray-700 border-b pb-2 border-gray-300">📜 Instructions</h3>
        <ul className="list-decimal pl-6 text-lg text-gray-600 space-y-2 mt-2">
          {(recipe.instructions || []).map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition disabled:opacity-50 shadow-lg"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin inline-block mr-2" /> : "Delete Recipe"}
          </button>
          <button
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-900 transition shadow-lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
