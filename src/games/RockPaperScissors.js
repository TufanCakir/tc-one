// src/screens/RockPaperScissors.js
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/RockPaperScissorsStyles";
import Footer from "../components/Footer";

const RockPaperScissors = () => {
  const navigation = useNavigation();
  const { coins, addCoins } = useContext(CoinsContext);
  const [playerVal, setPlayerVal] = useState(null);
  const [computerVal, setComputerVal] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const logic = (playerVal, computerVal) => {
    if (playerVal === computerVal) {
      return 0;
    } else if (
      (playerVal === "ROCK" && computerVal === "SCISSORS") ||
      (playerVal === "SCISSORS" && computerVal === "PAPER") ||
      (playerVal === "PAPER" && computerVal === "ROCK")
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const decision = (playerChoice) => {
    if (gameOver) return;
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const val = logic(playerChoice, compChoice);

    setPlayerVal(playerChoice);
    setComputerVal(compChoice);

    if (val === 1) {
      setPlayerScore((prev) => prev + 1);
    } else if (val === -1) {
      // Beim Verlust: Coins basierend auf der erreichten Punktzahl
      const earnedCoins = playerScore * 10;
      addCoins(earnedCoins);
      setGameOver(true);
    }
    // Bei Unentschieden passiert nichts weiter.
  };

  const handleRestart = () => {
    setPlayerScore(0);
    setCompScore(0);
    setPlayerVal(null);
    setComputerVal(null);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      {!gameOver && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => decision("ROCK")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Rock</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => decision("PAPER")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Paper</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => decision("SCISSORS")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Scissors</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Your choice: {playerVal}</Text>
        <Text style={styles.scoreText}>Computer's choice: {computerVal}</Text>
        <Text style={styles.scoreText}>Your Score: {playerScore}</Text>
        <Text style={styles.scoreText}>Computer Score: {compScore}</Text>
        <Text style={styles.scoreText}>Coins: {coins}</Text>
      </View>
      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TouchableOpacity onPress={handleRestart}>
            <View style={styles.overlayButton}>
              <Text style={styles.overlayButtonText}>Restart</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Footer />
    </View>
  );
};

export default RockPaperScissors;
