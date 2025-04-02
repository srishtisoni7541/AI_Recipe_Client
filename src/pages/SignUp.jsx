
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../utils/axios";
import { setUser } from "../redux/slices/AuthSlice";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); // Redux dispatch hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
          console.log("API BASE URL:", import.meta.env.VITE_API_URL); 

    try {
      const response = await API.post("/auth/register", formData);
      // console.log(response.data);

      const userData = response.data.user; 
      const token = response.data.user.accessToken; 
      // console.log(token);

      localStorage.setItem("token", token); 
      
      dispatch(setUser({ user: userData, accessToken: token })); 

      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/736x/8c/91/03/8c91037b894f9b07649cc3575d51303f.jpg')]">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign Up for Tasty Recipes!</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>} {/* Error Message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700">
          Already have an account? <Link to="/login" className="text-green-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

