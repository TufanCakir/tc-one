import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useProfile } from "../context/ProfileContext";

const STORAGE_KEY_NAME = "@profile_name";

export default function PlayerNameSectionComponent() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const { profileName, updateProfileName } = useProfile();

  // Name beim Start laden
  useEffect(() => {
    (async () => {
      try {
        const savedName = await AsyncStorage.getItem(STORAGE_KEY_NAME);
        setUsername(savedName || profileName || "");
      } catch (err) {
        console.warn("Fehler beim Laden des Namens:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [profileName]);

  const handleSave = useCallback(async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      Alert.alert("❌ Fehler", "Bitte gib einen gültigen Namen ein.");
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY_NAME, trimmed);
      updateProfileName(trimmed);
      Keyboard.dismiss();
      Alert.alert("✅ Gespeichert", "Dein Name wurde aktualisiert.");
    } catch (e) {
      console.error("Speicherfehler:", e);
      Alert.alert("⚠️ Fehler", "Der Name konnte nicht gespeichert werden.");
    }
  }, [username, updateProfileName]);

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>Lade Namen…</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Name</Text>

      <Text style={styles.label}>Aktueller Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Neuen Namen eingeben"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
        returnKeyType="done"
        maxLength={22}
        placeholderTextColor="#777"
      />

      <Pressable
        onPress={handleSave}
        disabled={!username.trim()}
        style={({ pressed }) => [
          styles.pressable,
          pressed && { opacity: 0.85 },
          !username.trim() && { opacity: 0.5 },
        ]}
      >
        <LinearGradient
          colors={["#000000", "#555555"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Speichern</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    borderRadius: 16,
    margin: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  pressable: {
    borderRadius: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});
