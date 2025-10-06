import React, { useState } from "react";
import ProductCard from "../assets/components/ProductCard";
import { useNavigate } from "react-router-dom";
import productsData from "../assets/Data/Product.json";
import { addToCart } from "../utils/cartUtils";

export default function ProductList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  if (!productsData || productsData.length === 0) {
    return <p>No products found.</p>;
  }

  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  let filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
    
      <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
       
          <div className="flex items-center gap-2">
            <span className="text-3xl">🛒</span>
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
              Shop<span className="text-gray-800">Zone</span>
            </h1>
          </div>

       
          <div className="flex flex-wrap items-center justify-center gap-4">
     
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border border-blue-300 rounded-lg px-4 py-2 bg-white text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
            >
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-blue-300 rounded-lg px-4 py-2 bg-white text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
            >
              <option value="none">Sort by</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center text-blue-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-blue-300 bg-white pl-10 pr-3 py-2 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
              />
            </div>
          </div>
        </div>
      </header>
<marquee class="sale-marquee" behavior="scroll" direction="left" scrollamount="10" >
  <div></div>
</marquee>
<div
  style={{
    width: "100%",
    overflow: "",
    background: "linear-gradient(90deg, #ff6a00, #ee0979)", // Gradient colors
    color: "white",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "18px",
    padding: "10px 20px", // balanced top-bottom spacing
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    position: "relative",
    display: "flex",
    alignItems: "center",
  }}
>
  <div
    style={{
      display: "cent",
      whiteSpace: "nowrap",
      animation: "moveText 12s linear infinite",
    }}
  >
    🔥 Hot Deals — Up to 70% OFF Today! 💥
  </div>

  <style>
    {`@keyframes moveText {
      from { transform: translateX(100%); } /* start from right edge */
      to { transform: translateX(-100%); }   /* move all the way left */
    }`}
  </style>
</div>




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
