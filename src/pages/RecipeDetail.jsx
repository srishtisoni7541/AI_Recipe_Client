
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/slices/RecipeSlice";
import { toast } from "react-toastify";
import API from "../utils/axios";
import {
  Loader,
  Trash2,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    console.log("Recipes from Redux:", recipes); // Check recipes format

    const fetchRecipe = async () => {
      if (Array.isArray(recipes)) {
        // Ensure it's an array
        const foundRecipe = recipes.find((r) => r.id === id);
        if (foundRecipe) {
          setRecipe(foundRecipe);
          return;
        }
      }

      // Fetch from API if not found in Redux
      try {
        const response = await API.get(`/recipes/getRecipeById/${id}`);
        console.log("Fetched Recipe:", response.data.data); // Check API response
        setRecipe(response.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id, recipes]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    setLoading(true);
    try {
      await API.delete(`/recipes/deleteRecipe/${id}`);
      dispatch(fetchRecipes());
      toast.success("🍽️ Recipe deleted successfully!", {
        position: "top-right",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error(" Failed to delete recipe!");
    } finally {
      setLoading(false);
    }
  };

  if (!recipe) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-gray-400">
        <div className="flex items-center space-x-3">
          <Loader size={32} className="animate-spin text-gray-800" />
          <p className="text-center text-gray-800 text-xl font-semibold animate-pulse">
            Fetching delicious recipe... 🍽️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-gray-300">
      <div className="p-6 max-w-3xl w-full bg-white bg-opacity-90 shadow-2xl rounded-2xl border border-gray-200 backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex justify-between items-center">
          <button
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-950 transition-all duration-200 shadow-lg active:scale-90"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <h2 className="text-4xl font-extrabold text-center text-blue-500 mt-4 mb-6 drop-shadow-lg">
          {recipe.title}
        </h2>

        {/* Ingredients Section */}
        <div className="mt-4">
          <button
            className="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-gray-200 transition-all duration-200"
            onClick={() => setShowIngredients(!showIngredients)}
          >
            🛒 Ingredients{" "}
            {showIngredients ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showIngredients
                ? "max-h-60 opacity-100 overflow-y-auto custom-scrollbar"
                : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2 mt-2">
              {recipe.ingredients.map((ingredientObj, index) => (
                <li key={index} className="mb-2">
                  {Object.entries(ingredientObj).map(([key, value]) => (
                    <div key={key} className="text-gray-700">
                      <strong className="text-gray-900">{key}:</strong> {value}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-6">
          <button
            className="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-gray-200 transition-all duration-200"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            📜 Instructions{" "}
            {showInstructions ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showInstructions
                ? "max-h-60 opacity-100 overflow-y-auto custom-scrollbar"
                : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-decimal pl-6 text-lg text-gray-700 space-y-2 mt-2">
              {(recipe.instructions || []).map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delete Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="p-4 bg-red-600 text-white rounded-full hover:bg-red-800 transition-all duration-200 shadow-lg active:scale-90 disabled:opacity-50 flex items-center justify-center"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" size={28} />
            ) : (
              <Trash2 size={28} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
