// src/screens/GameScreen.jsx
import React, { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GamesGrid from "../components/GamesGrid";
import styles from "../styles/GameScreenStyles";

export default function GameScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <GamesGrid
          navigation={navigation}
          onClose={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
