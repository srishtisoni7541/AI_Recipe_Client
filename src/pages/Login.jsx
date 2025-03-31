import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    try {
      const response = await API.post("/auth/login", { email, password }); 
      console.log("User Logged In:", response.data.user);

      localStorage.setItem("token", response.data.accessToken);  // Save the token

      localStorage.setItem("user", JSON.stringify(response.data.user)); 

      navigate("/home");  
    } catch (err) {

      console.error("Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials!");  // Show error message
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('https://i.pinimg.com/736x/8c/91/03/8c91037b894f9b07649cc3575d51303f.jpg')] text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Login to Recipe Hub</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>} {/* Error Message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white`}
            disabled={loading}  // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
