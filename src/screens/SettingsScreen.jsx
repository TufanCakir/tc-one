// src/screens/SettingsScreen.jsx
import React, { useCallback } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

import SettingsGrid from "../components/SettingsGrid";
import PlayerNameSection from "../components/PlayerNameSection";
import styles from "../styles/SettingsStyles";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const resetAccount = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        "Erfolg",
        "Alle Account-Daten wurden zurückgesetzt.",
        [{ text: "OK", onPress: async () => await Updates.reloadAsync() }],
        { cancelable: false }
      );
    } catch (error) {
      console.error("❌ Fehler beim Zurücksetzen von AsyncStorage:", error);
      Alert.alert(
        "Fehler",
        "Beim Zurücksetzen der Daten ist ein Problem aufgetreten. Bitte versuche es erneut."
      );
    }
  }, []);

  const confirmReset = useCallback(() => {
    Alert.alert(
      "Account zurücksetzen",
      "Bist du sicher? Alle gespeicherten Daten werden gelöscht und können nicht wiederhergestellt werden.",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Ja, zurücksetzen",
          onPress: resetAccount,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }, [resetAccount]);

  return (
    <View style={styles.container}>
      <PlayerNameSection />
      <View style={styles.content}>
        <SettingsGrid
          navigation={navigation}
          onResetAccount={confirmReset}
          onClose={navigation.goBack}
        />
      </View>
    </View>
  );
}
