import { useState } from "react";
import "./App.css";
import OutputScreen from "./components/OutputScreen";
import KeyBoard from "./components/Keyboard";

function App() {
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("");

  // /////////////////////////////////////////////////////////////////////

  function calculateResult() {
    let expression = input;
    const operators = [];
    const operands = [];

    function applyOperator() {
      const operator = operators.pop();
      const right = operands.pop();
      const left = operands.pop();
      switch (operator) {
        case "+":
          operands.push(left + right);
          break;
        case "-":
          operands.push(left - right);
          break;
        case "*":
          operands.push(left * right);
          break;
        case "/":
          operands.push(left / right);
          break;
      }
    }

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === " ") {
        continue;
      }

      if (!isNaN(parseFloat(expression[i]))) {
        let j = i;
        while (j < expression.length && (!isNaN(parseFloat(expression[j])) || expression[j] === ".")) {
          j++;
        }
        operands.push(parseFloat(expression.slice(i, j)));
        i = j - 1;
      } else if (expression[i] === "(") {
        operators.push(expression[i]);
      } else if (expression[i] === ")") {
        while (operators.length > 0 && operators[operators.length - 1] !== "(") {
          applyOperator();
        }
        operators.pop();
      } else if (expression[i] in precedence) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "(" &&
          precedence[operators[operators.length - 1]] >= precedence[expression[i]]
        ) {
          applyOperator();
        }
        operators.push(expression[i]);
      }
    }

    while (operators.length > 0) {
      applyOperator();
    }

    return handleResult(operands[0]);
  }

  // //////////////////////////////////////////////////////////////////

  const onSubmitResult = () => {
    calculateResult();
  };

  const inputDigits = (value) => {
    setOperation("");
    setInput((prevInput) => prevInput + value);
  };

  const handleResult = (result) => {
    setOperation(input);
    setInput(result);
  };

  const handleClear = () => {
    setInput("");
    setOperation("");
  };

  return (
    <div className="calculator-container">
      <OutputScreen input={input} operation={operation} />
      <KeyBoard inputDigits={inputDigits} onSubmitResult={onSubmitResult} handleClear={handleClear} />
    </div>
  );
}

export default App;
