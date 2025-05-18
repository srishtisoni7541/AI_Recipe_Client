


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";  
// import "react-toastify/dist/ReactToastify.css"; 
// import API from "../utils/axios";
// import { setUser } from "../redux/slices/AuthSlice";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await API.post("/auth/register", formData);
//       console.log(response.data);

//       const userData = response.data.user;
//       const token = response.data.user.accessToken;

//       localStorage.setItem("token", token);
//       dispatch(setUser({ user: userData, accessToken: token }));

//       // Success Notification
//       toast.success("Registration Successful!", {
//         position: "top-center",
//         autoClose: 2000,  
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//         style: { backgroundColor: "#1E3A8A", color: "#fff", fontSize: "16px" }, 
//       });

//       // 2 sec baad login page pe redirect
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);

//     } catch (err) {
//       console.error("Signup Error:", err.response?.data?.message || err.message);
      
//       // Backend error ko toast notification me dikhana
//       toast.error(err.response?.data?.message || "Something went wrong!", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//         style: { backgroundColor: "#DC2626", color: "#fff", fontSize: "16px" }, 
//       });
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center px-4 bg-[url('https://i.pinimg.com/736x/8c/91/03/8c91037b894f9b07649cc3575d51303f.jpg')] bg-cover bg-center">
//       <ToastContainer /> 

//       <motion.div 
//         initial={{ opacity: 0, scale: 0.8 }} 
//         animate={{ opacity: 1, scale: 1 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full sm:w-96"
//       >
//         <motion.h2 
//           initial={{ y: -20, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="text-3xl font-bold text-center text-blue-900 mb-6"
//         >
//           Sign Up for Tasty Recipes!
//         </motion.h2>

//         <motion.form 
//           onSubmit={handleSubmit} 
//           className="space-y-4"
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           {["name", "email", "password"].map((field) => (
//             <motion.input
//               key={field}
//               type={field === "email" ? "email" : field === "password" ? "password" : "text"}
//               name={field}
//               placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Password"}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
//               required
//               whileFocus={{ scale: 1.05 }}
//               whileHover={{ scale: 1.02 }}
//             />
//           ))}

//           <motion.button
//             type="submit"
//             className="w-fit bg-blue-900 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-md hover:shadow-lg"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Sign Up
//           </motion.button>
//         </motion.form>

//         <motion.p 
//           className=" mt-4 text-gray-700"
//           initial={{ opacity: 0, y: 10 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../utils/axios";
import { setUser } from "../redux/slices/AuthSlice";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState([]); // Validation errors ke liye state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset previous errors

    try {
      const response = await API.post("/auth/register", formData);
      console.log(response.data);

      const userData = response.data.user;
      const token = response.data.user.accessToken;

      localStorage.setItem("token", token);
      dispatch(setUser({ user: userData, accessToken: token }));

      // Success Notification
      toast.success("Registration Successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#1E3A8A", color: "#fff", fontSize: "16px" },
      });

      // 2 sec baad login page pe redirect
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.errors || err.message);

      // Backend validation errors ko store karna
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((error) => error.msg)); // Extract error messages
      } else {
        setErrors(["Something went wrong!"]);
      }

      // Toast ke through bhi error show karna
      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#DC2626", color: "#fff", fontSize: "16px" },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-[url('https://i.pinimg.com/736x/8c/91/03/8c91037b894f9b07649cc3575d51303f.jpg')] bg-cover bg-center">
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full sm:w-96"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-center text-blue-900 mb-6"
        >
          Sign Up for Tasty Recipes!
        </motion.h2>

        {/* Validation Errors UI */}
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4"
          >
            <ul>
              {errors.map((errMsg, index) => (
                <li key={index} className="mb-1">• {errMsg}</li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {["name", "email", "password"].map((field) => (
            <motion.input
              key={field}
              type={field === "email" ? "email" : field === "password" ? "password" : "text"}
              name={field}
              placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Password"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              required
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
          ))}

          <motion.button
            type="submit"
            className="w-fit bg-blue-900 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-4 text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
