
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import API from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", { email, password });

      // Store token and user data
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 2000,  
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#1E3A8A", color: "#fff", fontSize: "16px" }, 
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);

      const errorMessage = err.response?.data?.message || "Something went wrong!";

      // Show error message via toast
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,  
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#B91C1C", color: "#fff", fontSize: "16px" }, 
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('https://i.pinimg.com/736x/8c/91/03/8c91037b894f9b07649cc3575d51303f.jpg')] text-gray-900">
      <ToastContainer /> 

      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mx-4 sm:mx-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Login to Recipe Hub</h2>

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
          <motion.button
            type="submit"
            className={`w-full py-2 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
            }`}
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-900 hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
