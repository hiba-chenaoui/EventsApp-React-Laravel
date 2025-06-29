import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import BackgroundWrapper from "../components/BackgroundWrapper";
import FilterButtons from "../components/FilterButtons";
import SpaceCard from "../components/SpaceCard";
import fakeBusinessData from "../fakeData/fakeBusinessData";
import FloatingCartButton from "../components/FloatingCartButton";
import CartDrawer from "../components/CartDrawer";


import "./Welcome.css";

export default function OrganizerPage() {
  const { user } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCart, setShowCart] = useState(false);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <BackgroundWrapper image="https://i.pinimg.com/736x/8f/1a/16/8f1a1635e6ac2c77469d2257e5694d6f.jpg">
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", color: "#fff" }}>
          <h1 className="slogan">Let's make your event unforgettable!</h1>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
            <input
              type="search"
              placeholder="Search services, spaces, equipment..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                backgroundColor: "#fff",
              }}
            />
            <button
              style={{
                padding: "12px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ffda33",
                color: "#000",
                cursor: "pointer",
                boxShadow: "0 0 8px rgba(0,0,0,0.2)",
              }}
            >
              Enter
            </button>
          </div>
        </div>
      </BackgroundWrapper>

      <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      <div className="spaces-section">
        <h2 style={{ textAlign: "center", margin: "2rem 0" }}>Your Wellness Spaces</h2>
        <div className="spaces-grid">
          {fakeBusinessData.spaces.map((space, index) => (
            <SpaceCard key={index} space={space} role="organizer" />

          ))}
        </div>
      </div>
      <FloatingCartButton onClick={() => setShowCart(true)} />
      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </>
  );
}
