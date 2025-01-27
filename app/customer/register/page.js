"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import axios from "axios";

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
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
    const url = "/api/customer-register";
    try {
      const response = await axios.post(url, formData);
      const data = response.data;

      if (data.status === 400) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSuccess("Registration Successful, Proceed to login");
      setLoading(false);
    } catch (error) {
      // console.log(error);
      //   setError();
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#19381f] mb-8">
          Customer Registration
        </h1>
        <p
          className={`${error ? "text-red-500" : "text-green-500"} text-center`}
        >
          {error || success}
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
              {"Email (Company/school)"}
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
            <label htmlFor="organization" className="block mb-2">
              Organization/School
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
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

          <button
            type="submit"
            className="w-full bg-[#19381f] text-white py-2 rounded hover:bg-[#19381f]/80"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/customer/login" className="text-[#19381f]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
