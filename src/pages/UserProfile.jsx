
import { useEffect, useState } from "react";
import { FaUtensils, FaBookmark, FaHeart, FaCog, FaSignOutAlt } from "react-icons/fa";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";  

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Profile Section */}
      <div className="p-6 text-center shadow-lg rounded-lg bg-white">
        <div className="mx-auto w-24 h-24 rounded-full overflow-hidden">
          <img src={user.avatar || 'https://plus.unsplash.com/premium_photo-1677278873931-fa14d29d5edb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FkYnVyeXxlbnwwfHwwfHx8MA%3D%3D'} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
        <p className="text-gray-500">{user.username}</p>
        <span className="inline-block mt-3 px-4 py-1 text-sm font-medium bg-green-500 text-white rounded-full">
          {user.activityStatus}
        </span>
        <p className="text-sm text-gray-600 mt-3">{user.email}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <FaUtensils className="text-3xl mx-auto text-gray-700" />
          <p className="text-lg font-semibold mt-1">{user.recipesCount}</p>
          <p className="text-sm text-gray-500">Recipes</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <FaHeart className="text-3xl mx-auto text-red-500" />
          <p className="text-lg font-semibold mt-1">{user.likes}</p>
          <p className="text-sm text-gray-500">Likes</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <FaBookmark className="text-3xl mx-auto text-blue-500" />
          <p className="text-lg font-semibold mt-1">{user.saved}</p>
          <p className="text-sm text-gray-500">Saved</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
          <FaCog /> Settings
        </button>
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
