import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import RecipeGenerator from "./RecepiGenerator";
import Recipes from "./Recipes";
import API from "../utils/axios"; 

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]); 
  const modalRef = useRef(null);


  const fetchRecipes = async () => {
    try {
      const response = await API.get("/recipes/getAllRecipes");
      setRecipes(response.data.data);
    } catch (error) {
      // If token is invalid or expired, handle 401/403 error
      if (error.response?.status === 403 || error.response?.status === 401) {
        // Token invalid or expired, remove token and redirect to login
        localStorage.removeItem('token');
        navigate('/login'); 
      } else {
        console.error("Error fetching recipes:", error);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []); 

  const handleSaveRecipe = async (newRecipe) => {
    try {
      await API.post("/recipes/addRecipe", newRecipe);
      fetchRecipes(); 
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setIsModalOpen(false),
      });
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Recipe Hub</h1>
        <div className="space-x-4 flex items-center">
          <Link to="/profile/" className="hover:underline">Profile</Link>
          <Link to="/" className="hover:underline">Recipes</Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            🔮 Ask Gemini
          </button>
        </div>
      </nav>

      {/* Recipes Section */}
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Popular Recipes
        </h2>
        <Recipes recipes={recipes} />
      </div>

      {/* Gemini Recipe Modal with Animation */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-white shadow-xl p-6 z-50 w-full h-full overflow-auto"
        >
          <h2 className="text-2xl font-semibold mb-4">Ask Gemini for a Recipe</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <RecipeGenerator onSaveRecipe={handleSaveRecipe} /> 
        </div>
      )}
    </div>
  );
};

export default Home;
