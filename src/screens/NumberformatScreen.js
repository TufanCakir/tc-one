// src/screens/NumberformatScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import numberToWords from "number-to-words";
import Footer from "../components/Footer";
import styles from "../styles/NumberformatScreenStyles";
import GradientButton from "../components/GradientButton"; // Import des GradientButton
import {
  conversionFunctions,
  floatToFraction,
  roundToKthInteger,
  roundToSignificantDigits,
} from "../utils/conversionUtils";

export default function NumberformatScreen() {
  const [inputFormat, setInputFormat] = useState("decimal");
  const [inputNumber, setInputNumber] = useState("");
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");
  const [rounddigit, setRoundDigit] = useState("");
  const [rounddigitindex, setRoundDigitindex] = useState("2");
  const [significantno, setSignificantno] = useState("");
  const [significantnoindex, setSignificantnoindex] = useState("2");
  const [integer, setInteger] = useState("");
  const [numerator, setNumerator] = useState("0");
  const [denominator, setDenominator] = useState("0");
  const [inword, setInword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [options] = useState([
    { label: "Binary", value: "binary" },
    { label: "Decimal", value: "decimal" },
    { label: "Octal", value: "octal" },
    { label: "Hexadecimal", value: "hexadecimal" },
  ]);

  const handleConversion = () => {
    // Berechne die Werte lokal
    const decimalValue = conversionFunctions[inputFormat](inputNumber);
    const intVal = Math.floor(decimalValue);
    const binaryVal = intVal.toString(2);
    const octalVal = intVal.toString(8);
    const hexadecimalVal = intVal.toString(16).toUpperCase();
    const word =
      decimalValue <= 1000000000000000
        ? numberToWords.toWords(decimalValue)
        : "Over Limit (Max-Limit: 1000000000000000)";
    const roundDigit = roundToKthInteger(
      parseFloat(decimalValue),
      parseInt(rounddigitindex, 10)
    );
    let numeratorVal = "0";
    let denominatorVal = "0";
    if (inputFormat === "decimal" && parseFloat(decimal) - decimalValue !== 0) {
      const result = floatToFraction(parseFloat(decimal) - decimalValue);
      numeratorVal = result.numerator.toString();
      denominatorVal = result.denominator.toString();
    }
    const sigNo =
      inputFormat === "decimal"
        ? roundToSignificantDigits(
            parseFloat(decimal),
            parseInt(significantnoindex, 10)
          )
        : roundToSignificantDigits(
            parseFloat(decimalValue),
            parseInt(significantnoindex, 10)
          );

    // Aktualisiere die States
    setDecimal(decimalValue);
    setInteger(intVal.toString());
    setBinary(binaryVal);
    setOctal(octalVal);
    setHexadecimal(hexadecimalVal);
    setInword(word);
    setRoundDigit(roundDigit);
    setNumerator(numeratorVal);
    setDenominator(denominatorVal);
    setSignificantno(sigNo);

    // Automatisch speichern in AsyncStorage
    const results = {
      inputFormat,
      inputNumber,
      decimal: decimalValue,
      integer: intVal.toString(),
      binary: binaryVal,
      octal: octalVal,
      hexadecimal: hexadecimalVal,
      inword: word,
      rounddigit: roundDigit,
      significantno: sigNo,
      numerator: numeratorVal,
      denominator: denominatorVal,
    };

    AsyncStorage.setItem("@conversion_results", JSON.stringify(results))
      .then(() => console.log("Conversion results automatically saved"))
      .catch((error) =>
        console.error("Failed to automatically save conversion results", error)
      );
  };

  const handleReset = () => {
    setInputFormat("decimal");
    setInputNumber("");
    setDecimal("");
    setBinary("");
    setOctal("");
    setHexadecimal("");
    setRoundDigit("");
    setRoundDigitindex("2");
    setSignificantno("");
    setSignificantnoindex("2");
    setInteger("");
    setNumerator("0");
    setDenominator("0");
    setInword("");
  };

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => {
        setInputFormat(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Number Format Converter</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownButtonText}>{inputFormat}</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.label}>Enter {inputFormat} Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType={inputFormat !== "decimal" ? "default" : "numeric"}
              value={inputNumber}
              onChangeText={(text) => {
                if (inputFormat === "decimal") {
                  setDecimal(text);
                  setInputNumber(text);
                } else {
                  setInputNumber(text);
                }
              }}
            />
            {/* Convert Button als GradientButton */}
            <GradientButton
              title="Convert"
              onPress={handleConversion}
              style={styles.btn}
            />
          </View>
        </View>
        {/* Anzeige der Umrechnungsergebnisse */}
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Integer Number</Text>
          <Text style={styles.resultText}>{integer}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>
            Binary Format (Base-2) of Integer {integer}
          </Text>
          <Text style={styles.resultText}>{binary}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>
            Octal Format (Base-8) of Integer {integer}
          </Text>
          <Text style={styles.resultText}>{octal}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>
            Hexadecimal Format (Base-16) of Integer {integer}
          </Text>
          <Text style={styles.resultText}>{hexadecimal}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>In Words of Integer {integer}</Text>
          <Text style={styles.resultText}>{inword}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Rounded Number</Text>
          <Text style={styles.resultText}>{rounddigit}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Significant Number</Text>
          <Text style={styles.resultText}>{significantno}</Text>
        </View>
        {/* Reset Button als GradientButton */}
        <GradientButton
          title="Reset"
          onPress={handleReset}
          style={styles.btn}
        />
        {/* Modal for Options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                renderItem={renderOptionItem}
                keyExtractor={(item) => item.value}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Footer />
    </View>
  );
}
