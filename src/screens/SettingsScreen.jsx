// src/screens/SettingsScreen.js
import React, { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import SettingsGrid from "../components/SettingsGrid";
import styles from "../styles/SettingsStyles";
import PlayerNameSection from "../components/PlayerNameSection";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const resetAccount = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("testModeUses", "5");
      await AsyncStorage.setItem("coins", "0");
      await AsyncStorage.setItem("backgroundColors", JSON.stringify(null)); // oder einfach entfernen

      Alert.alert("Erfolg", "Alle Account-Daten wurden zurückgesetzt.", [
        { text: "OK", onPress: async () => await Updates.reloadAsync() },
      ]);
    } catch (error) {
      Alert.alert(
        "Fehler",
        "Beim Zurücksetzen der Daten ist ein Fehler aufgetreten."
      );
      console.error("Fehler beim Zurücksetzen von AsyncStorage:", error);
    }
  };

  const confirmReset = () => {
    Alert.alert(
      "Account zurücksetzen",
      "Bist du sicher? Dies wird alle Daten löschen und kann nicht rückgängig gemacht werden!",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Ja, zurücksetzen",
          onPress: resetAccount,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PlayerNameSection />
      <View style={styles.content}>
        <SettingsGrid
          navigation={navigation}
          onResetAccount={confirmReset}
          onClose={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
