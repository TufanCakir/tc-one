import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useProfile } from "../context/ProfileContext";
import Icon from "../components/Icon";
import iconData from "../data/iconData.json";

export default function ProfileScreen() {
  const { profileImage, updateProfileImage } = useProfile();

  const selectIcon = async (iconId) => {
    try {
      await updateProfileImage(iconId); // Speichert die ID des Icons
      Alert.alert("Erfolg", "Profil-Icon wurde gespeichert!");
    } catch (error) {
      console.error("Profil-Icon-Fehler:", error);
      Alert.alert("Fehler", "Beim Speichern ist ein Problem aufgetreten.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil-Icon auswählen</Text>

      {profileImage && (
        <View style={styles.profileIcon}>
          <Icon id={profileImage} size={80} color="#fff" />
        </View>
      )}

      <View style={styles.iconGrid}>
        {iconData.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            onPress={() => selectIcon(icon.id)}
            style={styles.iconButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#000000", "#444444"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Icon id={icon.id} size={40} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
  },
  profileIcon: {
    marginBottom: 24,
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: "#222",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  iconButton: {
    margin: 8,
  },
  gradientButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
