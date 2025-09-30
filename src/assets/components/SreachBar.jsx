import React from "react";

export default function SreachBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}
