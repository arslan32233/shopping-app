import React, { useState } from "react";

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f0f0f0",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Search bar */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
        <button onClick={handleSearch} style={{ padding: "5px 10px" }}>
          Search
        </button>
      </div>

      {/* Brands filter */}
      <div style={{ display: "flex", gap: "10px" }}>
        {brands.map((brand) => (
          <button
            key={brand}
            style={{
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              background: "#ddd",
              cursor: "pointer",
            }}
            onClick={() => onSearch(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    </header>
  );
}
