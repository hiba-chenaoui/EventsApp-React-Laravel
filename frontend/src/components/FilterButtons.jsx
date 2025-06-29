import React from "react";
import "../styles/FilterButtons.css";

const filters = [
  { label: "All Services", icon: "/assets/services.png", value: "all" },
  { label: "Spaces", icon: "/assets/spaces.png", value: "spaces" },
  { label: "Food", icon: "/assets/food.png", value: "food" },
  { label: "Equipment", icon: "/assets/equipment.png", value: "equipment" },
];

export default function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <div
          key={filter.value}
          className={`filter-card ${activeFilter === filter.value ? "active" : ""}`}
          onClick={() => onFilterChange(filter.value)}
        >
          <img src={filter.icon} alt={filter.label} className="filter-icon" />
          <h3>{filter.label}</h3>
        </div>
      ))}
    </div>
  );
}
