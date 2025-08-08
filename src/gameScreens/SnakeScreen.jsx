import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Footer from "../components/Footer";
import styles from "../styles/SnakeScreenStyles";

const { width } = Dimensions.get("window");

// Grid-Setup
const CELL = 18;
const PADDING = 12;
const PLAY_W = Math.min(width, 420) - PADDING * 2;
const COLS = Math.floor(PLAY_W / CELL);
const ROWS = Math.floor((PLAY_W * 1.2) / CELL);
const BOARD_W = COLS * CELL;
const BOARD_H = ROWS * CELL;

const DIR = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const samePos = (a, b) => a.x === b.x && a.y === b.y;
const randCell = () => ({
  x: Math.floor(Math.random() * COLS),
  y: Math.floor(Math.random() * ROWS),
});

export default function SnakeScreen() {
  const makeStart = () => {
    const start = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
    return [
      start,
      { x: start.x - 1, y: start.y },
      { x: start.x - 2, y: start.y },
    ];
  };

  const [snake, setSnake] = useState(makeStart);
  const [dir, setDir] = useState(DIR.RIGHT);
  const dirRef = useRef(dir);

  const [food, setFood] = useState(() => placeFood(makeStart()));
  const foodRef = useRef(food);

  const [score, setScore] = useState(0);
  const [tickMs, setTickMs] = useState(140);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const loopRef = useRef(null);
  const lastDirRef = useRef(dir);

  function placeFood(currentSnake) {
    let f = randCell();
    while (currentSnake.some((s) => samePos(s, f))) f = randCell();
    return f;
  }

  // Refs mit State synchronisieren
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);
  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  // Stabiler Game-Loop (keine deps auf snake/dir)
  useEffect(() => {
    if (!running || gameOver) return;
    clearInterval(loopRef.current);
    loopRef.current = setInterval(step, tickMs);
    return () => clearInterval(loopRef.current);
  }, [running, gameOver, tickMs]);

  // Ein Tick
  const step = () => {
    setSnake((prev) => {
      const curDir = dirRef.current;
      const curFood = foodRef.current;

      const head = prev[0];
      const next = { x: head.x + curDir.x, y: head.y + curDir.y };

      // Wände -> Game Over
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        setGameOver(true);
        setRunning(false);
        return prev;
      }

      const ate = samePos(next, curFood);

      // Selbstkollision: Tail darf betreten werden, wenn es sich wegbewegt (also !ate)
      const bodyToCheck = ate ? prev : prev.slice(0, -1);
      if (bodyToCheck.some((s) => samePos(s, next))) {
        setGameOver(true);
        setRunning(false);
        return prev;
      }

      const newSnake = [next, ...prev];
      if (!ate) {
        newSnake.pop();
      } else {
        setScore((v) => v + 1);
        const newFood = placeFood(newSnake);
        foodRef.current = newFood; // ref aktuell halten
        setFood(newFood);
        setTickMs((ms) => Math.max(70, ms - 4));
      }

      lastDirRef.current = curDir;
      return newSnake;
    });
  };

  // Swipe-Steuerung
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 12 || Math.abs(g.dy) > 12,
        onPanResponderMove: (_, g) => {
          const absX = Math.abs(g.dx);
          const absY = Math.abs(g.dy);
          if (absX > absY) {
            changeDir(g.dx > 0 ? DIR.RIGHT : DIR.LEFT);
          } else {
            changeDir(g.dy > 0 ? DIR.DOWN : DIR.UP);
          }
        },
        onPanResponderTerminationRequest: () => false,
      }),
    []
  );

  function changeDir(next) {
    const last = lastDirRef.current;
    const invalid =
      (last.x === 1 && next.x === -1) ||
      (last.x === -1 && next.x === 1) ||
      (last.y === 1 && next.y === -1) ||
      (last.y === -1 && next.y === 1);
    if (!invalid) setDir(next);
  }

  function restart() {
    const base = makeStart();
    setSnake(base);
    setDir(DIR.RIGHT);
    dirRef.current = DIR.RIGHT;
    lastDirRef.current = DIR.RIGHT;

    const newFood = placeFood(base);
    setFood(newFood);
    foodRef.current = newFood;

    setScore(0);
    setTickMs(140);
    setGameOver(false);
    setRunning(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Snake</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      {/* Spielfeld */}
      <View style={styles.boardWrap}>
        <View style={styles.board} {...panResponder.panHandlers}>
          {/* Food */}
          <View
            style={[
              styles.food,
              {
                left: food.x * CELL,
                top: food.y * CELL,
                width: CELL,
                height: CELL,
              },
            ]}
          />

          {/* Snake */}
          {snake.map((s, i) => {
            const isHead = i === 0;
            return (
              <View
                key={i}
                style={[
                  styles.segment,
                  {
                    left: s.x * CELL,
                    top: s.y * CELL,
                    width: CELL,
                    height: CELL,
                    borderColor: isHead ? "#fff" : "#222",
                    backgroundColor: isHead ? "#000" : "#fff",
                  },
                ]}
              />
            );
          })}

          {/* Overlay */}
          {(gameOver || !running) && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {gameOver ? "Game Over" : "Paused"}
              </Text>
              <TouchableOpacity style={styles.btnPrimary} onPress={restart}>
                <Text style={styles.btnPrimaryText}>
                  {gameOver ? "Restart" : "Play"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.btn, !running && styles.btnActive]}
          onPress={() => setRunning((r) => !r)}
        >
          <Text style={styles.btnText}>{running ? "Pause" : "Resume"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={restart}>
          <Text style={styles.btnText}>Restart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}
