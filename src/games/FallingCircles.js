// src/screens/FallingCirclesRPG.js
import React, { useState, useEffect, useRef, useContext } from "react";
<<<<<<< HEAD
import { Text, Dimensions, View, TouchableOpacity } from "react-native";
=======
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
>>>>>>> 50344c3 (massive bug fix and features)
import { Canvas, Circle } from "@shopify/react-native-skia";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/FallingCirclesRPGStyles";
<<<<<<< HEAD
import Footer from "../components/Footer";
=======
>>>>>>> 50344c3 (massive bug fix and features)

const { width, height } = Dimensions.get("window");
const CIRCLE_RADIUS = 20;
const FALL_INTERVAL = 50; // ms
const NEW_CIRCLE_INTERVAL = 1500; // Neuer Kreis alle 1,5 Sekunden
const FALL_SPEED = 3; // Geschwindigkeit, mit der die Kreise fallen
const COIN_REWARD = 5; // Coins pro Treffer

export default function FallingCirclesRPG() {
  const navigation = useNavigation();
  const { coins, addCoins } = useContext(CoinsContext);
  const [score, setScore] = useState(0);
  const [circles, setCircles] = useState([]);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const newCircleIntervalRef = useRef(null);
  const fallingIntervalRef = useRef(null);

  useEffect(() => {
    if (!gameOver) {
      newCircleIntervalRef.current = setInterval(() => {
        setCircles((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            x: Math.random() * (width - CIRCLE_RADIUS * 2) + CIRCLE_RADIUS,
            y: -CIRCLE_RADIUS,
          },
        ]);
      }, NEW_CIRCLE_INTERVAL);

      fallingIntervalRef.current = setInterval(() => {
        setCircles((prev) => {
          return prev
            .map((circle) => ({ ...circle, y: circle.y + FALL_SPEED }))
            .filter((circle) => {
              if (circle.y - CIRCLE_RADIUS > height) {
                setLives((prevLives) => Math.max(prevLives - 1, 0));
                return false;
              }
              return true;
            });
        });
      }, FALL_INTERVAL);
    }

    return () => {
      if (newCircleIntervalRef.current) {
        clearInterval(newCircleIntervalRef.current);
        newCircleIntervalRef.current = null;
      }
      if (fallingIntervalRef.current) {
        clearInterval(fallingIntervalRef.current);
        fallingIntervalRef.current = null;
      }
    };
  }, [gameOver]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      if (newCircleIntervalRef.current) {
        clearInterval(newCircleIntervalRef.current);
        newCircleIntervalRef.current = null;
      }
      if (fallingIntervalRef.current) {
        clearInterval(fallingIntervalRef.current);
        fallingIntervalRef.current = null;
      }
    }
  }, [lives]);

  const onTap = (event) => {
    const { x, y } = event.nativeEvent;
    setCircles((prev) => {
      let hit = false;
      const remaining = prev.filter((circle) => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        if (Math.sqrt(dx * dx + dy * dy) <= CIRCLE_RADIUS) {
          hit = true;
          return false;
        }
        return true;
      });
      if (hit) {
        setScore((prev) => prev + 1);
        addCoins(COIN_REWARD);
      }
      return remaining;
    });
  };

  const restartGame = () => {
    setScore(0);
    setCircles([]);
    setLives(3);
    setGameOver(false);
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.info}>
        Score: {score} | Lives: {lives} | Coins: {coins}
      </Text>
      <TapGestureHandler onActivated={onTap}>
        <Canvas style={styles.canvas}>
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              cx={circle.x}
              cy={circle.y}
              r={CIRCLE_RADIUS}
              color="#FF5722"
            />
          ))}
        </Canvas>
      </TapGestureHandler>
      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.gameOver}>Game Over!</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={restartGame}>
              <View style={styles.backButton}>
                <Text style={styles.buttonText}>Restart</Text>
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
}
