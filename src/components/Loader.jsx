import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center text-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
          alt="Loading"
        />
        <h1 className="mt-4 text-lg font-semibold text-gray-700">Ruk jaa bhai, jaldi kya hai!</h1>
      </div>
    </div>
  );
};

export default Loader;
