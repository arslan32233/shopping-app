import React, { useState } from "react";
import ProductCard from "../assets/components/ProductCard";
import { useNavigate } from "react-router-dom";
import productsData from "../assets/Data/Product.json";
import { addToCart } from "../utils/cartUtils";

export default function ProductList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  if (!productsData || productsData.length === 0) {
    return <p>No products found.</p>;
  }

  // 🔹 Unique brands
  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  // 🔹 Filter Logic
  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <>
      {/* 🔹 Header with Search + Brand Filter */}
      <header className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">🛍️ All Products</h1>

        {/* Brand Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      {/* 🔹 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() => handleAddToCart(p)}
              onOpenDetail={() => navigate(`/product/${p.id}`)}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 text-lg">
            ❌ No products found.
          </p>
        )}
      </div>
    </>
  );
}
