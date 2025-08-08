import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useProfile } from "../context/ProfileContext"; // <== Wichtig!

const STORAGE_KEY_NAME = "@profile_name";

function PlayerNameSectionComponent() {
  const [username, setUsername] = useState("");
  const { updateProfileName } = useProfile();

  useEffect(() => {
    AsyncStorage.getItem("user").then((savedUser) => {
      if (savedUser) setUsername(savedUser);
    });
  }, []);

  const handleSave = useCallback(async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      Alert.alert("Error", "Please enter a valid name.");
      return;
    }

    try {
      await AsyncStorage.setItem("user", trimmed);
      await AsyncStorage.setItem(STORAGE_KEY_NAME, trimmed);
      await updateProfileName(trimmed); // ✅ Jetzt korrekt
      Alert.alert("Saved", "Your name has been saved.");
    } catch (e) {
      Alert.alert("Error", "Could not save your name.");
      console.warn("Save error:", e);
    }
  }, [username, updateProfileName]);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Name</Text>
      <Text style={styles.label}>Current Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new name"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
        returnKeyType="done"
        maxLength={22}
        placeholderTextColor="#777"
      />
      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [
          { borderRadius: 12 },
          pressed && { opacity: 0.85 },
        ]}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default React.memo(PlayerNameSectionComponent);

const styles = StyleSheet.create({
  section: {
    padding: 20,
    borderRadius: 16,
    margin: 16,
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
    elevation: 4, // Android shadow
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
