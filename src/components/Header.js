// src/components/Header.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/HeaderStyles";

const Header = () => {
  const { coins } = useContext(CoinsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coins: {coins}</Text>
    </View>
  );
};

export default Header;
