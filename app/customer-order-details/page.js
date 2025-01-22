"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "@/components/Header";

export default function CustomerOrderStatus() {
  const [orders, setOrders] = useState([]);
  const [countdown, setCountdown] = useState(30);
  const [newlyCompletedOrders, setNewlyCompletedOrders] = useState([]);

  const getAllOrders = useCallback(() => {
    const url = "/api/get-all-order";

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          const newOrders = res.data.data;
          setNewlyCompletedOrders(
            newOrders.filter(
              (newOrder) =>
                newOrder.status === "Completed" &&
                !orders.some(
                  (oldOrder) =>
                    oldOrder.id === newOrder.id &&
                    oldOrder.status === "Completed"
                )
            )
          );
          setOrders(newOrders);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [orders]);

  useEffect(() => {
    getAllOrders();
    const intervalId = setInterval(() => {
      getAllOrders();
      setCountdown(30);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []); // Remove getAllOrders from the dependency array

  useEffect(() => {
    const countdownId = setInterval(() => {
      setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 30));
    }, 1000); // Change this to 1000 to count down every second

    return () => clearInterval(countdownId);
  }, []);

  useEffect(() => {
    if (newlyCompletedOrders.length > 0) {
      const timeoutId = setTimeout(() => {
        setNewlyCompletedOrders([]);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [newlyCompletedOrders]);

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  );
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#19381f] mb-8">
          Order Status Board
        </h1>
        <div className="text-center mb-4">
          <p className="text-xl">
            Next refresh in: <span className="font-bold">{countdown}</span>{" "}
            seconds
          </p>
        </div>
        {newlyCompletedOrders.length > 0 && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">New Completed Orders:</p>
            <ul>
              {newlyCompletedOrders.map((order) => (
                <li key={order.id}>
                  {order?.client?.name}'s order for{" "}
                  {order?.items?.map((item) => item.product.name).join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#19381f]">
              Processing Orders
            </h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {processingOrders.map((order) => (
                    <tr key={order.id} className="bg-yellow-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {order?.client?.name}
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc list-inside">
                          {order?.items?.map((item, index) => (
                            <li key={index}>{item.product.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        ${(order.totalPrice / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#19381f]">
              Completed Orders
            </h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {completedOrders.map((order) => (
                    <tr key={order.id} className="bg-green-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {order?.client?.name}
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc list-inside">
                          {order.items.map((item, index) => (
                            <li key={index}>{item.product.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        ${(order.totalPrice / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
