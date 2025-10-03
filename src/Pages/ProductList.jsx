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

  // 🔹 Unique brands nikalna
  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  // 🔹 Search aur brand ke hisaab se filter
  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <>
      {/* 🔹 Header with search + brand filter */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-bold">All Products</h1>

        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border px-2 py-1 rounded w-60"
        />
      </header>

      {/* 🔹 Product Grid */}
      <div className="grid grid-cols-3 gap-4 p-4" role="list">
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
          <p className="col-span-3 text-center">No products found.</p>
        )}
      </div>
    </>
  );
}
