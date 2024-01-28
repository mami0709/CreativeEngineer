"use client";

import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  const size = 80;
  const color = "#4fffb6";

  return (
    <div className="spinner-container flex items-center justify-center min-h-screen">
      <RingLoader size={size} color={color} />

      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
