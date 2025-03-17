// src/screens/Snake.js
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Dimensions,
  View,
  TouchableOpacity,
  Animated,
  Text as RNText,
} from "react-native";
import { Canvas, Rect, Skia, vec, TileMode } from "@shopify/react-native-skia";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/SnakeStyles";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");
const CELL_SIZE = 20;
const GRID_WIDTH = Math.floor(width / CELL_SIZE);
const GRID_HEIGHT = Math.floor(height / CELL_SIZE);

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_WIDTH),
  y: Math.floor(Math.random() * GRID_HEIGHT),
});

export default function Snake() {
  const navigation = useNavigation();
  const { coins, addCoins } = useContext(CoinsContext);
  const [snake, setSnake] = useState([
    { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) },
  ]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [apple, setApple] = useState(getRandomPosition());
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const moveInterval = useRef(null);
  const gameOverOpacity = useRef(new Animated.Value(0)).current;

  // Update-Funktion: Führt ein Update des Spiels aus – wenn gameOver, passiert nichts
  const updateGame = () => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Kollision mit Spielfeldrändern
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_WIDTH ||
        newHead.y < 0 ||
        newHead.y >= GRID_HEIGHT
      ) {
        setGameOver(true);
        clearInterval(moveInterval.current);
        return prevSnake;
      }

      // Selbstkollision
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        clearInterval(moveInterval.current);
        return prevSnake;
      }

      let newSnake = [newHead, ...prevSnake];

      // Apfel gegessen? Punkte erhöhen, neuen Apfel setzen und Coins hinzufügen
      if (newHead.x === apple.x && newHead.y === apple.y) {
        setApple(getRandomPosition());
        setPoints((prev) => {
          const newPoints = prev + 100;
          // 100 Punkte = 1 Coin
          addCoins(1);
          return newPoints;
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Starte den Spiel-Loop, sofern gameOver false ist
  useEffect(() => {
    if (!gameOver) {
      moveInterval.current = setInterval(updateGame, 150);
    }
    return () => clearInterval(moveInterval.current);
  }, [direction, apple, gameOver]);

  useEffect(() => {
    if (gameOver) {
      Animated.timing(gameOverOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [gameOver]);

  const handleGesture = ({ nativeEvent }) => {
    const { translationX, translationY } = nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Horizontale Swipe
      if (translationX > 0 && direction.x !== -1) {
        setDirection({ x: 1, y: 0 });
      } else if (translationX < 0 && direction.x !== 1) {
        setDirection({ x: -1, y: 0 });
      }
    } else {
      // Vertikale Swipe
      if (translationY > 0 && direction.y !== -1) {
        setDirection({ x: 0, y: 1 });
      } else if (translationY < 0 && direction.y !== 1) {
        setDirection({ x: 0, y: -1 });
      }
    }
  };

  // Erstelle einen Paint mit linear gradient für eine Zelle
  const getCellPaint = (x, y, colors) => {
    const start = vec(x * CELL_SIZE, y * CELL_SIZE);
    const end = vec((x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE);
    const convertedColors = colors.map((color) => Skia.Color(color));
    const shader = Skia.Shader.MakeLinearGradient(
      start,
      end,
      convertedColors,
      null,
      TileMode.Clamp
    );
    const paint = Skia.Paint();
    paint.setShader(shader);
    return paint;
  };

  // Zeichnet die Schlange mit einem Gradient (schwarz zu blau zu schwarz)
  const renderSnake = () =>
    snake.map((segment, index) => (
      <Rect
        key={index}
        x={segment.x * CELL_SIZE}
        y={segment.y * CELL_SIZE}
        width={CELL_SIZE}
        height={CELL_SIZE}
        paint={getCellPaint(segment.x, segment.y, [
          "#000000",
          "#0000FF",
          "#000000",
        ])}
      />
    ));

  // Zeichnet den Apfel mit einem Gradient (schwarz zu rot zu schwarz)
  const renderApple = () => (
    <Rect
      x={apple.x * CELL_SIZE}
      y={apple.y * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      paint={getCellPaint(apple.x, apple.y, ["#000000", "#FF0000", "#000000"])}
    />
  );

  const handleRestart = () => {
    clearInterval(moveInterval.current);
    setSnake([
      { x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) },
    ]);
    setDirection({ x: 0, y: -1 });
    setApple(getRandomPosition());
    setPoints(0);
    setGameOver(false);
    gameOverOpacity.setValue(0);
    moveInterval.current = setInterval(updateGame, 150);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={[styles.container]}>
        <Canvas style={styles.canvas}>
          {renderSnake()}
          {renderApple()}
        </Canvas>
        {gameOver && (
          <Animated.View style={[styles.overlay, { opacity: gameOverOpacity }]}>
            <RNText style={styles.gameOver}>Game Over</RNText>
            <RNText style={styles.scoreText}>
              Punkte: {points}
              {"\n"}Coins: {coins}
            </RNText>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleRestart}>
                <View style={styles.backButton}>
                  <RNText style={styles.buttonText}>Restart</RNText>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        <Footer />
      </View>
    </PanGestureHandler>
  );
}
