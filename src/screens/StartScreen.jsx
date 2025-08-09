import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/StartScreenStyles";

export default function StartScreen() {
  const navigation = useNavigation();

  const handleStart = useCallback(() => {
    navigation.replace("HomeScreen");
  }, [navigation]);

  const version = Constants.expoConfig?.version ?? "1.0.0";
  const buildNumber =
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode ??
    null;

  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to TC One</Text>

        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="App starten"
        >
          <LinearGradient
            colors={["#000000", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Version {version}
          {buildNumber ? ` (Build ${buildNumber})` : ""}
        </Text>
        <Text style={styles.copyrightText}>© {currentYear} Tufan Cakir</Text>
      </View>
    </View>
  );
}
