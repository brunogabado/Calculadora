import React from "react";
import "./Keyboard.css";

const Button = ({ keyName, value, onClick, className }) => {
  keyName === "÷" ? (value = "/") : keyName === "×" ? (value = "*") : (value = keyName);
  return (
    <button key={keyName} value={value} onClick={onClick} className={className}>
      {keyName}
    </button>
  );
};

export default Button;
