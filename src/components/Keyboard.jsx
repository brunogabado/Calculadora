import { useEffect } from "react";
import Button from "./Button";
import "./Keyboard.css";


const KeyBoard = ({ inputDigits, onSubmitResult, handleClear }) => {
  const buttonsOthers = ["C", "(", ")"];
  const buttonsSignsOperators = ["÷", "×", "-", "+", "="];
  const bunttonsNumbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  const getClickHandler = (group, key) => {
    switch (group) {
      case "others":
        return key === "C" ? handleClear : handleClick;
      case "signsOperators":
        return key === "=" ? onSubmitResult : handleClick;
      case "numbers":
        return handleClick;
      default:
        return handleClick;
    }
  };

  const getButtonClass = (group) => {
    switch (group) {
      case "others":
        return "calculator-button lightGreyStyle";
      case "signsOperators":
        return "calculator-button orangeStyle";
      case "numbers":
        return "calculator-button darkGreyStyle";
      default:
        return "calculator-button";
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      console.log(key);
      const keyMap = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "/": "÷",
        "*": "×",
        "-": "-",
        "+": "+",
        Enter: "=",
        Backspace: "C",
        Escape: "C",
      };

      if (key in keyMap) {
        event.preventDefault();
        key === "Enter" ? onSubmitResult : key === "Backspace" ? handleClear() : inputDigits(keyMap[key]);
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [inputDigits]);

  const handleClick = (event) => {
    inputDigits(event.target.value);
  };

  const generateButtons = (array, group) => {
    return array.map((key) => (
      <Button key={key} keyName={key} value={key} onClick={getClickHandler(group, key)} className={getButtonClass(group)}>
        {key}
      </Button>
    ));
  };


  return (
    <div className="keyboard-container">
      <div className="otherKeysContainer">{generateButtons(buttonsOthers, "others")}</div>
      <div className="signsKeysContainer">{generateButtons(buttonsSignsOperators, "signsOperators")}</div>
      <div className="numbersKeysContainer">{generateButtons(bunttonsNumbers, "numbers")}</div>
      <div className="bottomKeysContainer">
        <button key="0" value="0" onClick={handleClick} className="calculator-button darkGreyStyle big-button">
          0
        </button>
        <button key="." value="." onClick={handleClick} className="calculator-button darkGreyStyle">
          .
        </button>
      </div>
    </div>
  );
};

export default KeyBoard;
