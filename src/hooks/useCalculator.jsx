// src/hooks/useCalculator.js
import { useState } from "react";

const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState("");

  // Verarbeitet Zahleneingaben
  const handleNumberInput = (num) => {
    setDisplayValue(displayValue === "0" ? num.toString() : displayValue + num);
  };

  // Verarbeitet Operator-Eingaben
  const handleOperatorInput = (op) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  // Berechnet das Ergebnis und setzt es als neuen Display-Wert
  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    let result = 0;
    if (operator === "+") result = num1 + num2;
    else if (operator === "-") result = num1 - num2;
    else if (operator === "*") result = num1 * num2;
    else if (operator === "/") result = num1 / num2;
    setDisplayValue(result.toString());
    setOperator(null);
    setFirstValue("");
  };

  // Setzt alle Werte zurück
  const handleClear = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstValue("");
  };

  return {
    displayValue,
    handleNumberInput,
    handleOperatorInput,
    handleEqual,
    handleClear,
  };
};

export default useCalculator;
