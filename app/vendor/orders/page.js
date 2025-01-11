"use client";

import { useState } from "react";
import Header from "../../../components/Header";

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState("pending");

  // This data would come from your API in a real application
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      items: ["Coffee", "Croissant"],
      total: 8.5,
      status: "pending",
      timestamp: "2023-05-20 09:30:00",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: ["Tea", "Muffin"],
      total: 6.75,
      status: "completed",
      timestamp: "2023-05-20 10:15:00",
    },
    // Add more orders as needed
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

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
              activeTab === "pending"
                ? "text-[#19381f] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Orders
          </button>
          <button
            className={`${
              activeTab === "completed"
                ? "text-[#19381f] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Orders
          </button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.items.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status === "pending" && (
                      <button className="text-[#19381f] hover:text-[#19381f]/80">
                        Mark as Completed
                      </button>
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
