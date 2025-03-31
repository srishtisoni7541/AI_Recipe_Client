import React from "react";
import { Link } from "react-router-dom";

const LoadPage = () => {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-gray-900 text-white  bg-center relative"
     
    >
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black    bg-opacity-50"  style={{
        backgroundImage: "url('https://i.pinimg.com/736x/44/be/79/44be79a36ec42e79fad1f8abc2ebac90.jpg')",
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to AI Recipe Generator</h1>
        <p className="text-lg mb-6">Discover and generate amazing recipes with AI. Join us now!</p>

        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoadPage;
