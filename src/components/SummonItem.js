// src/components/SummonItem.js
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/SummonScreenStyles";

const SummonItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.gradientPreviewContainer}>
        <LinearGradient colors={item.colors} style={styles.gradientPreview} />
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );
};

export default SummonItem;
