// src/components/ProgressBar.jsx
import React from "react";
function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ 
          width: `${value}%`,
          transformOrigin: 'left center',
          transitionProperty: 'width'
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
