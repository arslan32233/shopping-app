import React from "react";

export default function FilterBar({ categories, selected, onChange }) {
  return (
    <div className="filter-bar">
      <label>Filter by Category:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
