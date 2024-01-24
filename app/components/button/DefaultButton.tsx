import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

type DefaultButtonProps = {
  color?: string;
  outline?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  text: string;
  fontSize?: string;
  rounded?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  color = "white",
  outline,
  backgroundColor = "yellow-400",
  borderColor = "blue-500",
  text,
  fontSize = "text-base",
  rounded,
  onClick,
  type,
  loading = false,
}) => {
  const buttonClasses = `
    text-${color} 
    ${outline ? `border border-${borderColor}` : ""} 
    bg-${backgroundColor}  
    ${rounded ? "rounded" : ""} 
    ${fontSize} 
    px-6 py-2 
    hover:bg-opacity-80 
    active:scale-95 
    transition 
    ease-in-out 
    duration-150
  `;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={loading}
    >
      {loading ? <ClockLoader color="#36d7b7" /> : text}
    </button>
  );
};
