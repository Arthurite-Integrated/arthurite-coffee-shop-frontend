"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import axios from "axios";

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API Integration
    const url = "/api/signup";
    try {
      const response = await axios.post(url, formData);
      const data = response.data;

      console.log(response.data);

      if (data.status === 400) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSuccess("Registration Successful, Proceed to login");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#19381f] mb-8">
          Vendor Registration
        </h1>
        <p
          className={`${error ? "text-red-500" : "text-green-500"} text-center`}
        >
          {error || success}
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#19381f]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#19381f]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#19381f]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#19381f]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="storeName" className="block mb-2">
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#19381f]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#19381f] text-white py-2 rounded hover:bg-[#19381f]/80"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/vendor/login" className="text-[#19381f]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
