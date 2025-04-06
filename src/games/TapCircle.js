// src/screens/TapCircle.js
import React, { useState, useEffect, useContext } from "react";
import { Dimensions, View, Text } from "react-native";
import {
  Canvas,
  Circle,
  vec,
  Skia,
  TileMode,
} from "@shopify/react-native-skia";
import { TapGestureHandler } from "react-native-gesture-handler";
import { CoinsContext } from "../context/CoinsContext";
import { BackgroundContext } from "../context/BackgroundContext";
import styles from "../styles/TapCircleStyles";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");
const CIRCLE_RADIUS = 30;
const COIN_REWARD = 5; // Coins pro Treffer

export default function TapCircle() {
  const { coins, addCoins } = useContext(CoinsContext);
  const { backgroundColors } = useContext(BackgroundContext);
  const [score, setScore] = useState(0);
  const [circlePos, setCirclePos] = useState({
    x: width / 2,
    y: height / 3,
  });

  // Verwende den aktuellen Hintergrund aus dem Context, um die Gradientfarben dynamisch zu setzen
  const dynamicGradientColors =
    backgroundColors && backgroundColors.length > 1
      ? [backgroundColors[0], backgroundColors[1], backgroundColors[0]]
      : ["#000000", "#0000FF", "#000000"]; // Fallback

  // Aktualisiere die Kreisposition alle 1,5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCirclePos({
        x: Math.random() * (width - CIRCLE_RADIUS * 2) + CIRCLE_RADIUS,
        y: Math.random() * (height / 2 - CIRCLE_RADIUS * 2) + CIRCLE_RADIUS,
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Wird aufgerufen, wenn ein Tap registriert wurde.
  // Die Koordinaten x und y sind relativ zur Canvas.
  const onTap = (event) => {
    const { x, y } = event.nativeEvent;
    const dx = x - circlePos.x;
    const dy = y - circlePos.y;
    if (Math.sqrt(dx * dx + dy * dy) <= CIRCLE_RADIUS) {
      setScore((prevScore) => prevScore + 1);
      addCoins(COIN_REWARD);
    }
  };

  // Erstelle einen linearen Gradient-Shader für den Kreis.
  const shader = Skia.Shader.MakeLinearGradient(
    vec(circlePos.x - CIRCLE_RADIUS, circlePos.y - CIRCLE_RADIUS),
    vec(circlePos.x + CIRCLE_RADIUS, circlePos.y + CIRCLE_RADIUS),
    dynamicGradientColors.map((c) => Skia.Color(c)),

    null,
    TileMode.Clamp
  );
  const paint = Skia.Paint();
  paint.setShader(shader);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        Score: {score} | Coins: {coins}
      </Text>
      <TapGestureHandler onActivated={onTap}>
        <Canvas style={styles.canvas}>
          <Circle
            cx={circlePos.x}
            cy={circlePos.y}
            r={CIRCLE_RADIUS}
            paint={paint}
          />
        </Canvas>
      </TapGestureHandler>
      <Text style={styles.instruction}>Tippe auf den Kreis!</Text>
      <Footer />
    </View>
  );
}
