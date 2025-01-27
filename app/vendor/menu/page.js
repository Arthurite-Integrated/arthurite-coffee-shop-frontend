"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "../../../components/Header";
import axios from "axios";

export default function VendorMenu() {
  const [menuItems, setMenuItems] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    imageUrl: "",
  });

  const fetchAllProduct = useCallback(() => {
    const url = "/api/get-all-product";

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMenuItems(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const token =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = "/api/create-product";

    try {
      const res = await axios.post(url, newItem, { headers });

      alert("Item added successfully!");
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error sending data:", error);

      alert("Failed to add item. Please try again.");
      setLoading(false);
    }
  };

  const [deletingItems, setDeletingItems] = useState({});

  const handleDelete = async (productId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      id: productId,
    };
    const url = "/api/delete-product";
    setDeletingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await axios.delete(url, { headers });
      alert("Product deleted successfully!");
      window.location.reload(); // Refresh the list after successful deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    } finally {
      setDeletingItems((prev) => ({ ...prev, [productId]: false }));
    }
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
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={newItem.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
          >
            {loading ? "Loading..." : "Add item"}
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
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems?.map((item) => (
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
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={deletingItems[item.id]}
                    >
                      {deletingItems[item.id] ? "Deleting..." : "Delete"}
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
