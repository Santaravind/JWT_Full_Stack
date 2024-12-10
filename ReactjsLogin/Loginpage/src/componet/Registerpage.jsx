import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Registerpage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        role: "",
      });
    
      const navigate=useNavigate();

      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send registration data to the backend
         const response = await axios.post("http://localhost:8080/auth/register", formData);
          navigate("/login");

        console.log(formData);
          // Handle success
          setSuccessMessage("Registration successful! Please login.");
          setFormData({ name: "", email: "", password: "", city: "", role: "" });
          setErrorMessage("");
        } catch (error) {
          // Handle error
          setErrorMessage("Error registering. Please try again.");
          setSuccessMessage("");
        }
      };
    
  return (
    <div className="flex flex-col items-center mt-12">
    <h2 className="text-2xl font-semibold mb-6">Register</h2>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-80 bg-white p-6 rounded-lg shadow-lg"
    >
      <label htmlFor="name" className="text-gray-700 font-medium mb-2">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <label htmlFor="email" className="text-gray-700 font-medium mb-2">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <label htmlFor="password" className="text-gray-700 font-medium mb-2">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <label htmlFor="city" className="text-gray-700 font-medium mb-2">
        City:
      </label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Enter your city"
        value={formData.city}
        onChange={handleChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <label htmlFor="role" className="text-gray-700 font-medium mb-2">
        Role:
      </label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="user">USER</option>
        <option value="admin">ADMIN</option>
      </select>
  
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  
    {successMessage && (
      <p className="text-green-500 mt-4">{successMessage}</p>
    )}
    {errorMessage && (
      <p className="text-red-500 mt-4">{errorMessage}</p>
    )}
    <h2 className="mt-6">
      If you are already registered,{" "}
      <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
        Login
      </Link>
    </h2>
  </div>
  
  )
}

export default Registerpage
