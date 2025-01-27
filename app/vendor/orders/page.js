"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "@/components/Header";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Processing");
  const [loadingStates, setLoadingStates] = useState({});
  const [messages, setMessages] = useState({});

  const getAllOrders = useCallback(() => {
    const url = "/api/get-all-order";

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again.");
      });
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const handleMarkAsCompleted = async (orderId) => {
    setLoadingStates((prev) => ({ ...prev, [orderId]: "completing" }));
    setMessages((prev) => ({ ...prev, [orderId]: "" }));

    const config = {
      method: "put",
      url: "/api/modify-order",
      headers: {
        "Content-Type": "application/json",
        "order-id": orderId,
      },
    };

    try {
      const response = await axios.request(config);

      setMessages((prev) => ({
        ...prev,
        [orderId]: "Order marked as completed",
      }));
      alert("Order marked as completed successfully");
      getAllOrders();
    } catch (error) {
      // console.log(error);
      setMessages((prev) => ({
        ...prev,
        [orderId]: "Failed to mark order as completed",
      }));
      alert("Failed to mark order as completed. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  const handleDeleteOrder = async (orderId) => {
    setLoadingStates((prev) => ({ ...prev, [orderId]: "deleting" }));
    setMessages((prev) => ({ ...prev, [orderId]: "" }));

    const config = {
      method: "delete",
      url: "/api/delete-order",
      headers: {
        "Content-Type": "application/json",
        "order-id": orderId,
      },
    };

    try {
      const response = await axios.request(config);

      setMessages((prev) => ({
        ...prev,
        [orderId]: "Order deleted successfully",
      }));
      alert("Order deleted successfully");
      getAllOrders();
    } catch (error) {
      // console.log(error);
      setMessages((prev) => ({ ...prev, [orderId]: "Failed to delete order" }));
      alert("Failed to delete order. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#19381f] mb-8">
          Orders Management
        </h1>
        <div className="mb-4">
          <button
            className={`mr-4 ${
              activeTab === "Processing"
                ? "text-[#19381f] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Processing")}
          >
            Processing Orders
          </button>
          <button
            className={`${
              activeTab === "Completed"
                ? "text-[#19381f] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed Orders
          </button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.client ? order.client.name : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.items.map((item) => item.product.name).join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.totalItems}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${(order.totalPrice / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status === "Processing" && (
                      <button
                        className="text-[#19381f] hover:text-[#19381f]/80 mr-2 disabled:opacity-50"
                        onClick={() => handleMarkAsCompleted(order.id)}
                        disabled={loadingStates[order.id] === "completing"}
                      >
                        {loadingStates[order.id] === "completing"
                          ? "Marking as Completed..."
                          : "Mark as Completed"}
                      </button>
                    )}
                    <button
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={loadingStates[order.id] === "deleting"}
                    >
                      {loadingStates[order.id] === "deleting"
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                    {messages[order.id] && (
                      <p className="text-sm text-gray-600 mt-1">
                        {messages[order.id]}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
