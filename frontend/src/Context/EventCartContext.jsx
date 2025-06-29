import React, { createContext, useContext, useState } from "react";

const EventCartContext = createContext();

export const useEventCart = () => useContext(EventCartContext);

export const EventCartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    spaces: [],
    food: [],
    equipment: []
  });

  const addToCart = (item, type) => {
    setCart((prev) => ({
      ...prev,
      [type]: [...prev[type], item]
    }));
  };

  const removeFromCart = (itemId, type) => {
    setCart((prev) => ({
      ...prev,
      [type]: prev[type].filter(i => i.id !== itemId)
    }));
  };

  const clearCart = () => {
    setCart({ spaces: [], food: [], equipment: [] });
  };

  return (
    <EventCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </EventCartContext.Provider>
  );
};
