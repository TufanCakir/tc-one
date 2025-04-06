// src/screens/StartScreen.js
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";
import Constants from "expo-constants";
import styles from "../styles/StartScreenStyles";

export default function StartScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace("HomeScreen");
  };

  // Versionsinformationen aus expo-constants
  const expoConfig = Constants.expoConfig;
  const version = expoConfig?.version || "1.0.0";
  const buildVersion =
    expoConfig?.ios?.buildNumber || expoConfig?.android?.versionCode || "1";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to All In One Hub</Text>
        <GradientButton
          title="Start"
          onPress={handleStart}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Version {version}
          {buildVersion !== "1" && ` (Build ${buildVersion})`}
        </Text>
        <Text style={styles.copyrightText}>© Tufan Cakir</Text>
      </View>
    </View>
  );
}
