// src/components/MiniGameModal.js
import React from "react";
import { View, FlatList } from "react-native";
import GradientButton from "./GradientButton";
import styles from "../styles/MiniGamesStyles";

const buttons = [
  { title: "Snake", screen: "Snake" },
  { title: "Rock Paper Scissors", screen: "RockPaperScissors" },
  { title: "Number Guessing", screen: "NumberGuessing" },
  { title: "Tap Circle", screen: "TapCircle" },
  { title: "Falling Circles", screen: "FallingCircles" },
  { title: "Gardient Tap Challenge", screen: "GardientTapChallenge" },
  { title: "Pong", screen: "Pong" },
  { title: "Tap Game", screen: "TapGame" },
];

export default function MiniGameModal({ navigation, onClose }) {
  return (
    <View style={styles.modalContent}>
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.screen}
        numColumns={3}
        renderItem={({ item }) => (
          <GradientButton
            title={item.title}
            onPress={() => {
              navigation.navigate(item.screen);
              onClose();
            }}
            style={styles.button}
          />
        )}
      />
      <GradientButton
        title="Close"
        onPress={onClose}
        style={styles.closeButton}
        textStyle={{ fontSize: 30 }}
      />
    </View>
  );
}
