// src/components/Footer.js
import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundContext } from "../context/BackgroundContext";
import styles from "../styles/FooterStyles";

const Footer = () => {
  const navigation = useNavigation();
  const { backgroundColors } = useContext(BackgroundContext);

  return (
    <LinearGradient colors={backgroundColors} style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DevToolsScreen")}
      >
        <Text style={styles.buttonText}>Dev Tools</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MiniGamesScreen")}
      >
        <Text style={styles.buttonText}>Mini Games</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ShopScreen")}
      >
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfilScreen")}
      >
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Footer;
