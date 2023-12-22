import React from "react";
import "./OutputScreen.css";

const OutputScreen = ({ input, operation }) => {
  return (
    <div className="outputScreen-container">
      <h3 className="input-result-output">{input}</h3>
      <p className="prevOperation-digits">{operation}</p>
    </div>
  );
};

export default OutputScreen;
