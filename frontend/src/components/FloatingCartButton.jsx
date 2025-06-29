import React from "react";
import { useEventCart } from "../Context/EventCartContext";

const FloatingCartButton = ({ onClick }) => {
  const { cart } = useEventCart();
  const itemCount =
    cart.spaces.length + cart.food.length + cart.equipment.length;

  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "700px",
        right: "24px",
        backgroundColor: "#ffda33",
        color: "#fff",
        padding: "14px 22px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "30px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 1100
      }}
    >
      🛒 {itemCount} item{itemCount !== 1 && "s"} – View Plan
    </button>
  );
};

export default FloatingCartButton;
