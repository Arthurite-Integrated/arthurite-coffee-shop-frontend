"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API Integration
    const url = "/api/customer-login";
    try {
      const response = await axios.post(url, formData);
      const data = response.data;

      if (data.status === 400) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      console.log(data.data);
      window.localStorage.setItem("customer_token", data.data.token);
      window.localStorage.setItem("customer_email", data.data.email);
      window.localStorage.setItem("customer_name", data.data.name);
      window.localStorage.setItem("customer_id", data?.data?.id || null);

      setLoading(false);

      setTimeout(() => {
        router.push("/customer/dashboard");
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#19381f] mb-8">
          Customer Login
        </h1>
        <p
          className={`${error ? "text-red-500" : "text-green-500"} text-center`}
        >
          {error || success}
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#19381f] text-white py-2 rounded hover:bg-[#19381f]/80"
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/customer/register" className="text-[#19381f]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
