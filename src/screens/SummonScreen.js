// src/screens/SummonScreen.js
import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";
import Footer from "../components/Footer";
import { CoinsContext } from "../context/CoinsContext";
import { SummonedBackgroundsContext } from "../context/SummonedBackgroundsContext";
import summonBackgrounds from "../data/summonBackgrounds.json";
import styles from "../styles/SummonScreenStyles";
import Header from "../components/Header";

// Verwende die Daten aus summonBackgrounds.json als verfügbare Hintergründe
const availableBackgrounds = summonBackgrounds;

const SummonScreen = () => {
  const navigation = useNavigation();
  const { coins, subtractCoins } = useContext(CoinsContext);
  const { summonedBackgrounds, setSummonedBackgrounds } = useContext(
    SummonedBackgroundsContext
  );

  // Hilfsfunktion: Wähle zufällig einen Hintergrund, der noch nicht beschworen wurde
  const getRandomBackground = () => {
    const notSummoned = availableBackgrounds.filter(
      (bg) => !summonedBackgrounds.some((sbg) => sbg.id === bg.id)
    );
    if (notSummoned.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * notSummoned.length);
    return notSummoned[randomIndex];
  };

  // Single Summon: 5 Coins kosten, füge 1 zufällig ausgewählten Hintergrund hinzu
  const handleSingleSummon = () => {
    if (coins < 5) {
      Alert.alert(
        "Not enough coins!",
        "You need at least 5 coins for a single summon."
      );
      return;
    }
    const background = getRandomBackground();
    if (!background) {
      Alert.alert(
        "No more backgrounds",
        "All available backgrounds have been summoned."
      );
      return;
    }
    // Bestätigungsabfrage
    Alert.alert("Confirm Single Summon", `Do you want to summon for 5 coins?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => {
          subtractCoins(5);
          // Setze die Liste der beschworenen Hintergründe neu (nur 1 Hintergrund)
          setSummonedBackgrounds([background]);
          // Navigiere zur SummonResultScreen
          navigation.navigate("SummonResultScreen");
        },
      },
    ]);
  };

  // Multi Summon: 50 Coins kosten, füge bis zu 10 zufällig ausgewählte Hintergründe hinzu
  const handleMultiSummon = () => {
    if (coins < 50) {
      Alert.alert(
        "Not enough coins!",
        "You need at least 50 coins for a multi summon."
      );
      return;
    }
    const notSummoned = availableBackgrounds.filter(
      (bg) => !summonedBackgrounds.some((sbg) => sbg.id === bg.id)
    );
    if (notSummoned.length === 0) {
      Alert.alert(
        "No more backgrounds",
        "All available backgrounds have been summoned."
      );
      return;
    }
    const numToSummon = Math.min(43, notSummoned.length);
    const newSummons = [];
    for (let i = 0; i < numToSummon; i++) {
      const randomIndex = Math.floor(Math.random() * notSummoned.length);
      newSummons.push(notSummoned[randomIndex]);
      notSummoned.splice(randomIndex, 1);
    }
    // Bestätigungsabfrage
    Alert.alert("Confirm Multi Summon", `Do you want to summon for 50 coins?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => {
          subtractCoins(50);
          // Ersetze die aktuellen beschworenen Hintergründe mit den neu beschworenen
          setSummonedBackgrounds(newSummons);
          // Navigiere zur SummonResultScreen
          navigation.navigate("SummonResultScreen");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* Buttons für Single und Multi Summon */}
      <View style={styles.buttonRow}>
        <GradientButton
          title="Single (5 Coins)"
          onPress={handleSingleSummon}
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
        />
        <GradientButton
          title="Multi (50 Coins)"
          onPress={handleMultiSummon}
          style={styles.actionButton}
          textStyle={styles.actionButtonText}
        />
      </View>
      <Footer />
    </View>
  );
};

export default SummonScreen;
