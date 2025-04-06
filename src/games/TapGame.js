// src/screens/TapGame.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext"; // CoinsContext import

const { width, height } = Dimensions.get("window");
const HIGH_SCORE_KEY = "@tapGameHighScore";

export default function TapGame() {
  const navigation = useNavigation();
  const { coins, addCoins, resetCoins } = useContext(CoinsContext); // Verwendung des Context
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(3);

  // Highscore beim Start laden
  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const storedHighScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        if (storedHighScore !== null) {
          setHighScore(parseInt(storedHighScore, 10));
        }
      } catch (error) {
        console.error("Error loading highscore:", error);
      }
    };
    loadHighScore();
  }, []);

  // Bei jedem Score-Update oder Neustart: neue Position & Timer setzen
  useEffect(() => {
    if (gameOver) return;

    // Zufällige Position für den Button (Button: 100x100 px)
    const randomX = Math.floor(Math.random() * (width - 100));
    const randomY = Math.floor(Math.random() * (height - 200)) + 50;
    setButtonPos({ x: randomX, y: randomY });

    // Timer für 3 Sekunden; läuft der Timer ab, ist das Spiel vorbei
    setTimeLeft(3);
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameOver(true);
          saveHighScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [score, gameOver]);

  const handleTap = () => {
    if (gameOver) return;
    // Bei einem erfolgreichen Tap: Score erhöhen und 10 Coins dazu
    setScore((prev) => prev + 1);
    addCoins(10);
  };

  const saveHighScore = async () => {
    if (score > highScore) {
      try {
        await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
        setHighScore(score);
      } catch (error) {
        console.error("Error saving highscore:", error);
      }
    }
  };

  const restartGame = () => {
    setScore(0);
    resetCoins();
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>Coins: {coins}</Text>
      <Text style={styles.scoreText}>High Score: {highScore}</Text>
      {!gameOver ? (
        <TouchableOpacity
          style={[styles.tapButton, { top: buttonPos.y, left: buttonPos.x }]}
          onPress={handleTap}
        >
          <Text style={styles.buttonText}>Tap Me!</Text>
          <Text style={styles.timerText}>{timeLeft}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.scoreText}>Your Score: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  tapButton: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#FF4081",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  gameOverContainer: {
    alignItems: "center",
  },
  gameOverText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: "#FF4081",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#FF4081",
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
});
