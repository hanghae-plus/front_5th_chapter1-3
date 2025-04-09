import React from "react";

type ButtonType = "button" | "submit";
type ButtonColor = "blue" | "green" | "red";

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  children: React.ReactNode;
  color?: ButtonColor;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  color = "blue",
  className = "",
}) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-700",
    green: "bg-green-500 hover:bg-green-700",
    red: "bg-red-500 hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${colorClasses[color]} 
        text-white font-bold py-2 px-4 rounded
        ${className}
      `}
    >
      {children}
    </button>
  );
};
