
import { useEffect, useState } from "react";
import { FaCog, FaBookmark, FaTrash, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import SavedRecipes from "./SavedRecipes";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("saved"); // Default option
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/users/profile");
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      setError("Failed to log out");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible!"
      )
    ) {
      try {
        await API.delete("/users/delete");
        localStorage.clear();
        navigate("/signup");
      } catch (err) {
        setError("Failed to delete account");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar (Desktop: Left, Mobile: Hidden) */}
      <div className="w-full md:w-1/4 bg-white shadow-lg p-6 flex flex-col items-center md:items-start md:min-h-screen">
        {/* User Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 relative">
          <img
            src={user.avatar || "https://plus.unsplash.com/premium_photo-1716572865911-1966b41dd359?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Mobile Menu Button (Top-right of Avatar) */}
        <div className="absolute top-0 right-0 p-2 md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <FaEllipsisV className="text-xl" />
          </button>
        </div>
        <h2 className="text-xl font-bold mt-3">{user.name}</h2>
        <p className="text-gray-500 mb-4">{user.email}</p>

        {/* Navigation Menu (Hidden on Mobile unless opened) */}
        <nav
          className={`w-full md:flex md:flex-col ${isMenuOpen ? "block" : "hidden"} md:block bg-white shadow-md p-4 rounded-md absolute top-20 right-5 md:relative md:top-0 md:right-0 max-w-xs`}
        >
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition ${
              selectedOption === "saved" ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setSelectedOption("saved");
              setIsMenuOpen(false);
            }}
          >
            <FaBookmark /> Saved Recipes
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition ${
              selectedOption === "settings" ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setSelectedOption("settings");
              setIsMenuOpen(false);
            }}
          >
            <FaCog /> Settings
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-red-500 hover:bg-red-100 transition"
            onClick={handleDeleteAccount}
          >
            <FaTrash /> Delete Account
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Content Area (Scrollable) */}
      <div className="w-full md:w-3/4 p-6 min-h-screen overflow-y-auto">
        {selectedOption === "saved" && <SavedRecipes likedRecipes={user.likedRecipes} />}
        {selectedOption === "settings" && (
          <p className="text-gray-700">⚙️ Settings will be added soon.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
