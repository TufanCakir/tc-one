// src/screens/NumberGuessing.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/NumberGuessingStyles";
<<<<<<< HEAD
import Footer from "../components/Footer";
=======
>>>>>>> 50344c3 (massive bug fix and features)

function generateRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

const NumberGuessing = () => {
  const navigation = useNavigation();
  const { coins, addCoins } = useContext(CoinsContext);
  const [term, setTerm] = useState("");
  const [result, setResult] = useState("");
  const [secretNum, setSecretNum] = useState(generateRandomNumber());
  const [stepCount, setStepCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setStepCount(0);
  }, [secretNum]);

  const handleChange = (text) => {
    setTerm(text);
  };

  const checkGuess = () => {
    let newResult = "";

    if (term === "") {
      newResult = "Enter Valid Input";
    } else if (isNaN(term) || parseInt(term) < 1 || parseInt(term) > 20) {
      newResult = "Enter a valid number between 1 and 20";
    } else {
      const currentStep = stepCount + 1;
      setStepCount(currentStep);

      if (parseInt(term) < secretNum) {
        newResult = "Higher";
      } else if (parseInt(term) > secretNum) {
        newResult = "Lower";
      } else {
        const coinReward = Math.max(0, 200 - currentStep * 10);
        addCoins(coinReward);
        newResult = `Yippee, correct! It took you ${currentStep} ${
          currentStep === 1 ? "step" : "steps"
        }. You earned ${coinReward} coins!`;
        setGameOver(true);
      }
    }

    setResult(newResult);
  };

  const handleRestart = () => {
    setSecretNum(generateRandomNumber());
    setStepCount(0);
    setTerm("");
    setResult("");
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Guess Number between 1 to 20</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        onChangeText={handleChange}
        value={term}
        keyboardType="numeric"
        editable={!gameOver}
      />
      <TouchableOpacity onPress={checkGuess} disabled={gameOver}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Check</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.result}>You Guessed: {result}</Text>
      <Text style={styles.coinsText}>Total Coins: {coins}</Text>
      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.finalText}>Secret number was: {secretNum}</Text>
          <Text style={styles.finalText}>
            It took you {stepCount} {stepCount === 1 ? "step" : "steps"}.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRestart}>
              <View style={styles.overlayButton}>
                <Text style={styles.overlayButtonText}>Restart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
<<<<<<< HEAD
      <Footer />
=======
>>>>>>> 50344c3 (massive bug fix and features)
    </View>
  );
};

export default NumberGuessing;
