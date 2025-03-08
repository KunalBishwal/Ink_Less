// src/components/Card.jsx
import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded p-6">
      {children}
    </div>
  );
}

export default Card;
