"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { useCartContext } from "../../components/CartProvider";
import axios from "axios";
// import { useWindow, useWindowWidth, useWindowHeight } from "@/hooks/use-window"
export default function Checkout() {
  const { cart, clearCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const items = cart.map((item) => ({
    _id: item.id,
    quantity: item.quantity,
  }));

  const clientID =
    typeof window !== "undefined"
      ? window.localStorage.getItem("customer_id")
      : null;
  // const clientID = "678879355184774bde508c17";

  const formData = {
    clientId: clientID,
    items: items,
    status: "Processing",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // API Integration
    const url = "/api/create-order";
    try {
      const response = await axios.post(url, formData);

      const data = response.data;

      if (data.status === 400) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setSuccess(data.message);

      setLoading(false);

      setShowModal(true);
      clearCart();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#19381f] mb-8">Checkout</h1>
        <p className={`${error ? "text-red-500" : "text-green-500"}`}>
          {error || success}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cardName" className="block mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="expiry" className="block mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#19381f] text-white py-2 rounded hover:bg-[#19381f]/80"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Completed</h2>
            <p>Your order is on its way!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
