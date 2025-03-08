// src/screens/RandomNumberScreen.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/RandomNumberStyles";
import Footer from "../components/Footer";

export default function RandomNumberScreen() {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 100;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(number);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={generateRandomNumber}>
        <Text style={styles.buttonText}>Generate Number</Text>
      </TouchableOpacity>
      {randomNumber !== null && (
        <Text style={styles.randomNumber}>Number: {randomNumber}</Text>
      )}
      <Footer />
    </View>
  );
}
