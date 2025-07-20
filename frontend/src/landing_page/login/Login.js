
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://stock-1-slqt.onrender.com/api/auth/login", formData, {
        withCredentials: true,
      });

      // Save user session in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to dashboard
     window.location.href = "https://stock-dash-u6a4.onrender.com/dashboard/stock";


    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Login to Dashboard</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
