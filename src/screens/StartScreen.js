// src/screens/StartScreen.js
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";
import styles from "../styles/StartScreenStyles";

export default function StartScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to my app!</Text>
        <Text style={styles.subtitle}>
          Experience innovative features and cool designs.
        </Text>
        <GradientButton
          title="Let's go"
          onPress={handleStart}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}
