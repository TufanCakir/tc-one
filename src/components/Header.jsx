import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useProfile } from "../context/ProfileContext";
import Icon from "../components/Icon";

export default function Header() {
  const { profileImage } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {profileImage ? (
          <Icon id={profileImage} size={32} color="#fff" />
        ) : (
          <Text style={styles.placeholder}>🙂</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#111",
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    fontSize: 20,
    color: "#888",
  },
});
