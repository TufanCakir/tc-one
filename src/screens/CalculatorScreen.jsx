import { View, Text, TouchableOpacity } from "react-native";
import useCalculator from "../hooks/useCalculator";
import styles from "../styles/CalculatorStyles";
import Footer from "../components/Footer";

const numberRows = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
];

const operators = [
  { label: "÷", value: "/" },
  { label: "×", value: "*" },
  { label: "−", value: "-" },
  { label: "+", value: "+" },
];

function CalcButton({ onPress, style, textStyle, children, label }) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label ?? children}
      activeOpacity={0.75}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

export default function CalculatorScreen() {
  const {
    displayValue,
    handleNumberInput,
    handleOperatorInput,
    handleEqual,
    handleClear,
  } = useCalculator();

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      {/* Button Area */}
      <View style={styles.buttonContainer}>
        {numberRows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((num) => (
              <CalcButton
                key={num}
                onPress={() => handleNumberInput(num)}
                style={styles.button}
                textStyle={styles.buttonText}
                label={`Nummer ${num}`}
              >
                {num}
              </CalcButton>
            ))}
            <CalcButton
              key={operators[rowIndex].value}
              onPress={() => handleOperatorInput(operators[rowIndex].value)}
              style={[styles.button, styles.operatorButton]}
              textStyle={[styles.buttonText, styles.operatorButtonText]}
              label={`Operator ${operators[rowIndex].label}`}
            >
              {operators[rowIndex].label}
            </CalcButton>
          </View>
        ))}

        {/* Vierte Reihe: 0, +, = */}
        <View style={styles.row}>
          <CalcButton
            onPress={() => handleNumberInput(0)}
            style={[styles.button, styles.zeroButton]}
            textStyle={[styles.buttonText, styles.zeroButtonText]}
            label="Null"
          >
            0
          </CalcButton>
          <CalcButton
            onPress={() => handleOperatorInput(operators[3].value)}
            style={[styles.button, styles.operatorButton]}
            textStyle={[styles.buttonText, styles.operatorButtonText]}
            label={`Operator ${operators[3].label}`}
          >
            {operators[3].label}
          </CalcButton>
          <CalcButton
            onPress={handleEqual}
            style={styles.equalButton}
            textStyle={styles.equalButtonText}
            label="Gleich"
          >
            =
          </CalcButton>
        </View>

        {/* Clear */}
        <CalcButton
          onPress={handleClear}
          style={styles.clearButton}
          textStyle={styles.clearButtonText}
          label="Löschen"
        >
          C
        </CalcButton>
      </View>
      <Footer />
    </View>
  );
}
