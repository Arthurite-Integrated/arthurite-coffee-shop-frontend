"use client";

import { useState } from "react";
import Header from "../../../components/Header";

export default function VendorMenu() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Coffee",
      description: "Freshly brewed coffee",
      price: 2.5,
      category: "drinks",
      inStock: true,
    },
    {
      id: 2,
      name: "Croissant",
      description: "Buttery and flaky",
      price: 3.0,
      category: "pastries",
      inStock: true,
    },
    // Add more menu items as needed
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMenuItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "",
      inStock: true,
    });
  };

  const handleDelete = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleStock = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#19381f] mb-8">
          Menu Management
        </h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Item Name"
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="px-3 py-2 border rounded"
              required
            />
            <select
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="drinks">Drinks</option>
              <option value="pastries">Pastries</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
          >
            Add Item
          </button>
        </form>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
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
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStock(item.id)}
                      className={`px-2 py-1 rounded ${
                        item.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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
