
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchRecipes, selectNewRecipeAdded } from "../redux/slices/RecipeSlice";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";  
// import API from "../utils/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Recipes = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { recipes, status, error } = useSelector((state) => state.recipes);

//   const currentUser = useSelector((state) => state.user) || JSON.parse(localStorage.getItem('user'));

//   const newRecipeAdded = useSelector(selectNewRecipeAdded);

//   useEffect(() => {
//     if (newRecipeAdded) {
//       dispatch(fetchRecipes());
//     }
//   }, [newRecipeAdded]);

//   const [likedRecipes, setLikedRecipes] = useState({});

//   const toggleLike = async (recipeId) => {
//     setLikedRecipes((prev) => ({
//       ...prev,
//       [recipeId]: !prev[recipeId],
//     }));

//     try {
//       const response = await API.post(`/recipes/likeRecipes/${recipeId}`); 

//       if (response.status === 200) {
//         toast.success("Recipe liked successfully! check your profile ."); // Success toast
//       }
//     } catch (error) {
//       console.error("Error liking the recipe:", error);
//       toast.error("Failed to like the recipe."); // Error toast
      
//       setLikedRecipes((prev) => ({
//         ...prev,
//         [recipeId]: !prev[recipeId],
//       }));
//     }
//   };

//   const filteredRecipes = recipes.filter(recipe => recipe.userId === currentUser._id);

//   return (
//     <div className="p-6">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      
//       <h2 className="text-3xl font-bold mb-4 text-center">🍽️ Your Recipes</h2>

//       {status === "loading" && <p className="text-center">Loading...</p>}
//       {status === "failed" && <p className="text-center text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredRecipes.length === 0 ? (
//           <p className="text-center text-gray-500">You haven't added any recipes yet.</p>
//         ) : (
//           filteredRecipes.map((recipe) => (
//             <div key={recipe._id} className="relative group bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={recipe.imageUrl || "https://i.pinimg.com/474x/1b/dc/09/1bdc09ea5a714a29493d039f5e130533.jpg"}
//                 alt={recipe.title}
//                 className="w-full h-48 object-cover rounded-md mb-3"
//               />
//               <h3 className="text-xl font-semibold">{recipe.title}</h3>
//               <p className="text-gray-600 text-sm">{recipe.description}</p>

//               <button
//                 onClick={() => navigate(`/recipe/${recipe._id}`)}
//                 className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-green-400 bg-opacity-80 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//               >
//                 View
//               </button>

//               {/* Like Button */}
//               <button
//                 onClick={() => toggleLike(recipe._id)}
//                 className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//               >
//                 <Heart
//                   className={`w-6 h-6 ${likedRecipes[recipe._id] ? "text-red-500 fill-red-500" : "text-gray-500"}`}
//                 />
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recipes;





import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, selectNewRecipeAdded } from "../redux/slices/RecipeSlice";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";  
import API from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes = [], status, error } = useSelector((state) => state.recipes); // <- fallback to empty array

  const currentUser = useSelector((state) => state.user) || JSON.parse(localStorage.getItem("user"));

  const newRecipeAdded = useSelector(selectNewRecipeAdded);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (newRecipeAdded) {
      dispatch(fetchRecipes());
    }
  }, [newRecipeAdded, dispatch]);

  const [likedRecipes, setLikedRecipes] = useState({});

  const toggleLike = async (recipeId) => {
    setLikedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));

    try {
      const response = await API.post(`/recipes/likeRecipes/${recipeId}`); 

      if (response.status === 200) {
        toast.success("Recipe liked successfully! Check your profile.");
      }
    } catch (error) {
      console.error("Error liking the recipe:", error);
      toast.error("Failed to like the recipe.");
      
      setLikedRecipes((prev) => ({
        ...prev,
        [recipeId]: !prev[recipeId],
      }));
    }
  };

  // ✅ Safe filtering
  const filteredRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe.userId === currentUser?._id)
    : [];

  return (
    <div className="p-6">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <h2 className="text-3xl font-bold mb-4 text-center">🍽️ Your Recipes</h2>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-500">You haven't added any recipes yet.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="relative group bg-white rounded-lg shadow-md p-4">
              <img
                src={
                  recipe.imageUrl ||
                  "https://i.pinimg.com/474x/1b/dc/09/1bdc09ea5a714a29493d039f5e130533.jpg"
                }
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-600 text-sm">{recipe.description}</p>

              <button
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-green-400 bg-opacity-80 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                View
              </button>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(recipe._id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Heart
                  className={`w-6 h-6 ${
                    likedRecipes[recipe._id] ? "text-red-500 fill-red-500" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;
