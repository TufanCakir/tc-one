// src/components/Footer.js
import React, { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundContext } from "../context/BackgroundContext";
import FooterSvg from "./FooterSvg";
import styles from "../styles/FooterStyles";

const Footer = () => {
  const navigation = useNavigation();
  const { backgroundColors } = useContext(BackgroundContext);

  return (
    <LinearGradient colors={backgroundColors} style={styles.footer}>
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <FooterSvg icon="home" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("MiniGamesScreen")}
        >
          <FooterSvg icon="minigames" />
          <Text style={styles.iconText}>Mini Games</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("SummonScreen")}
        >
          <FooterSvg icon="summon" />
          <Text style={styles.iconText}>Summon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("NewsScreen")}
        >
          <FooterSvg icon="news" />
          <Text style={styles.iconText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("DevToolsScreen")}
        >
          <FooterSvg icon="devtools" />
          <Text style={styles.iconText}>Dev Tools</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <FooterSvg icon="settings" />
          <Text style={styles.iconText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Footer;
