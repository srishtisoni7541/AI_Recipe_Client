
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import RecipeGenerator from "./RecepiGenerator";
import Recipes from "./Recipes";
import API from "../utils/axios";
import debounce from "lodash.debounce";
import { fetchRecipes, } from "../redux/slices/RecipeSlice"; // Redux actions import ki

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);
  const menuRef = useRef(null);
  
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items); // Redux se recipes le rahe hain

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleSearch = debounce((query) => {
    dispatch(fetchRecipes(query));
  }, 500);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      dispatch(fetchRecipes());
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  const handleDeleteRecipe = async (id) => {
    try {
      await API.delete(`/recipes/delete/${id}`);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-blue-900 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold">Recipe Hub</h1>
        {/* search bar */}
        <div className="relative w-full sm:w-80">
          <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={20} className="text-white/80" />
            <input
              type="text"
              placeholder="Search Recipes..."
              className="ml-3 w-full bg-transparent text-white placeholder-white/50 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center">
          <Link to="/profile/" className="hover:underline">
            Profile
          </Link>
          <Link to="/" className="hover:underline">
            Recipes
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            🔮 Ask Gemini
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 py-2 bg-white flex items-center">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search Recipes..."
          className="ml-2 w-full bg-transparent focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-3/4 h-full bg-blue-900 text-white p-6 flex flex-col space-y-4 transform transition-all duration-300 ease-in-out z-[9999] ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Link
          to="/profile/"
          className="hover:underline"
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>
        <Link
          to="/"
          className="hover:underline"
          onClick={() => setMenuOpen(false)}
        >
          Recipes
        </Link>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setMenuOpen(false);
          }}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          🔮 Ask Gemini
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Popular Recipes
        </h2>
        <Recipes recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
      </div>

      {/* Modal for Recipe Generator */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-white shadow-xl p-6 sm:p-10 z-50 w-full h-full overflow-auto"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Ask Gemini for a Recipe
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <RecipeGenerator />
        </div>
      )}
    </div>
  );
};

export default Home;
