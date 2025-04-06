// src/screens/Pong.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import { BackgroundContext } from "../context/BackgroundContext";

const { width, height } = Dimensions.get("window");
const HIGH_SCORE_KEY = "@highScore";

const Pong = () => {
  const navigation = useNavigation();
  const { coins, addCoins, resetCoins } = useContext(CoinsContext);
  const { backgroundColors } = useContext(BackgroundContext);
  const [ballPos, setBallPos] = useState({ x: width / 2, y: height / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const ballRadius = 10;

  // Berechne dynamische Ballfarbe basierend auf backgroundColors:
  const ballColor =
    backgroundColors && backgroundColors.length > 1
      ? backgroundColors[1]
      : "white";

  // Lade den Highscore aus AsyncStorage
  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const storedHighScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        if (storedHighScore !== null) {
          setHighScore(parseInt(storedHighScore, 10));
        }
      } catch (error) {
        console.error("Fehler beim Laden des Highscores:", error);
      }
    };
    loadHighScore();
  }, []);

  // Game-Loop: Aktualisiert Ballposition, prüft Kollisionen und erkennt "Game Over"
  useEffect(() => {
    if (gameOver) return;
    let animationId;
    const update = () => {
      setBallPos((prevPos) => {
        let newX = prevPos.x + ballVelocity.x;
        let newY = prevPos.y + ballVelocity.y;
        let newVelX = ballVelocity.x;
        let newVelY = ballVelocity.y;

        // Kollision mit linker/rechter Wand
        if (newX - ballRadius < 0 || newX + ballRadius > width) {
          newVelX = -newVelX;
          newX = prevPos.x + newVelX;
        }
        // Obere Wand
        if (newY - ballRadius < 0) {
          newVelY = -newVelY;
          newY = prevPos.y + newVelY;
        }
        // Unten: Geht der Ball aus dem Bildschirm, ist das Game Over
        if (newY - ballRadius > height) {
          setGameOver(true);
          saveHighScore(score);
        }

        setBallVelocity({ x: newVelX, y: newVelY });
        // Score steigt kontinuierlich
        setScore((prevScore) => prevScore + 1);

        return { x: newX, y: newY };
      });
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [ballVelocity, gameOver, score]);

  // Speichert den Highscore, falls aktueller Score höher ist
  const saveHighScore = async (currentScore) => {
    try {
      const newHighScore = currentScore > highScore ? currentScore : highScore;
      setHighScore(newHighScore);
      await AsyncStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
    } catch (error) {
      console.error("Fehler beim Speichern des Highscores:", error);
    }
  };

  // Beim Tippen: Ist der Ball in der Gefahrenzone (untere 100 Pixel) und fällt, wird er nach oben "abgeprallt"
  // und der Spieler erhält einen Coin.
  const handleTap = () => {
    if (ballVelocity.y > 0 && ballPos.y + ballRadius >= height - 100) {
      setBallVelocity({ x: ballVelocity.x, y: -Math.abs(ballVelocity.y) });
      addCoins(1);
    }
  };

  // Setzt das Spiel zurück
  const resetGame = () => {
    setBallPos({ x: width / 2, y: height / 2 });
    setBallVelocity({ x: 5, y: 5 });
    setScore(0);
    resetCoins();
    setGameOver(false);
  };

  // Back-Handler: Navigiert zur vorherigen Seite
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        <Canvas style={{ flex: 1 }}>
          {/* Ball mit dynamischer Farbe */}
          <Circle
            cx={ballPos.x}
            cy={ballPos.y}
            r={ballRadius}
            color={ballColor}
          />
        </Canvas>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.scoreText}>Coins: {coins}</Text>
          <Text style={styles.scoreText}>Highscore: {highScore}</Text>
        </View>
        {gameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Button title="Neustarten" onPress={resetGame} />
            <Button title="Zurück" onPress={handleBack} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  scoreText: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  gameOverOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Pong;
