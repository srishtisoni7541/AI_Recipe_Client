
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { Loader, Trash2, ArrowLeft } from "lucide-react";

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
      <div className="p-6 max-w-3xl w-full bg-white bg-opacity-90 shadow-xl rounded-2xl border border-gray-300 backdrop-blur-md h-[80vh] overflow-y-auto relative">
        {/* Top Right Buttons */}
        <div className="justify-between flex gap-3">
          <button
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900 transition shadow-lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition shadow-lg disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" size={24} /> : <Trash2 size={24} />}
          </button>
        </div>

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
                          <li key={subKey}>{subKey}: {subValue}</li>
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
      </div>
    </div>
  );
};

export default RecipeDetail;  