import React, { useMemo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/FooterStyles";

export default function Footer() {
  const navigation = useNavigation();

  const buttons = useMemo(
    () => [
      {
        iconSet: Ionicons,
        iconName: "home-outline",
        label: "Home",
        screen: "HomeScreen",
      },
      // Weitere Buttons einfach ergänzen
    ],
    []
  );

  return (
    <LinearGradient
      colors={["#000000", "#1a1a1a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.footer}
    >
      <View style={styles.iconRow}>
        {buttons.map((btn, index) => {
          const Icon = btn.iconSet;
          return (
            <TouchableOpacity
              key={btn.label || index}
              style={styles.iconContainer}
              onPress={() => navigation.navigate(btn.screen)}
              accessibilityRole="button"
              accessibilityLabel={`${btn.label} öffnen`}
              activeOpacity={0.8}
            >
              <Icon
                name={btn.iconName}
                size={22}
                color="#fff"
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
              />
              <Text style={styles.iconText} numberOfLines={1}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}
