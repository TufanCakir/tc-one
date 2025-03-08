// src/screens/GradientTapChallenge.js
import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
import { Dimensions, View, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/GradientTapChallengeStyles";
import Footer from "../components/Footer";
=======
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/GradientTapChallengeStyles";
>>>>>>> 50344c3 (massive bug fix and features)

const { width, height } = Dimensions.get("window");
const BAR_WIDTH = 100;
const BAR_HEIGHT = 30;
const TARGET_ZONE_WIDTH = 100; // Breite der Zielzone
const SPEED = 5; // Pixel, um die sich der Balken pro Intervall bewegt
const INTERVAL_MS = 30; // Update-Intervall in Millisekunden
const COIN_REWARD = 5; // Coins, die pro Treffer vergeben werden

export default function GradientTapChallenge() {
  const navigation = useNavigation();
  const { coins, addCoins } = useContext(CoinsContext);
  const [score, setScore] = useState(0);
  const [barX, setBarX] = useState(-BAR_WIDTH); // Startposition links außerhalb des Bildschirms

  // Bewege den Balken kontinuierlich von links nach rechts
  useEffect(() => {
    const interval = setInterval(() => {
      setBarX((prev) => {
        const next = prev + SPEED;
        return next > width ? -BAR_WIDTH : next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Beim Tap wird geprüft, ob der Balken in der Zielzone ist
  const onTap = () => {
    const targetStart = width / 2 - TARGET_ZONE_WIDTH / 2;
    const targetEnd = width / 2 + TARGET_ZONE_WIDTH / 2;
    const barCenter = barX + BAR_WIDTH / 2;
    if (barCenter >= targetStart && barCenter <= targetEnd) {
      setScore((prev) => prev + 1);
      addCoins(COIN_REWARD);
    }
    // Reset: Balken startet wieder von links
    setBarX(-BAR_WIDTH);
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={onTap}>
        <View style={styles.container}>
          <Text style={styles.info}>
            Score: {score} | Coins: {coins}
          </Text>
          {/* Zielzone in der Mitte des Bildschirms */}
          <View
            style={[
              styles.targetZone,
              { left: width / 2 - TARGET_ZONE_WIDTH / 2 },
            ]}
          />
          {/* Beweglicher Balken */}
          <View
            style={[styles.bar, { left: barX, backgroundColor: "yellow" }]}
          />
<<<<<<< HEAD
          <Footer />
=======
>>>>>>> 50344c3 (massive bug fix and features)
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
