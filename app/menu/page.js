"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { useCartContext } from "../../components/CartProvider";
import axios from "axios";

export default function Menu() {
  const { addToCart } = useCartContext();
  const [menuItems, setMenuItems] = useState([]);

  const fetchAllProduct = () => {
    const url = "/api/get-all-product";

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setMenuItems(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  };

  useState(() => {
    fetchAllProduct();
  }, []);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      addToCart({ ...item, quantity });
      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#19381f] mb-8">Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems?.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
                  disabled={!quantities[item.id]}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
