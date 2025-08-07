import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const inputRef = useRef();

  useEffect(() => {
    AsyncStorage.getItem("user").then((savedUser) => {
      if (savedUser) navigation.replace("HomeScreen");
    });

    // Autofokus
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [navigation]);

  const isDisabled = !username.trim();

  const handleLogin = useCallback(() => {
    const trimmed = username.trim();
    if (!trimmed) {
      Alert.alert("Missing Name", "Please enter a valid player name.");
      return;
    }

    Alert.alert(
      "Confirm Login",
      `Are you sure you want to continue as "${trimmed}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.setItem("user", trimmed);
              navigation.replace("HomeScreen");
            } catch {
              Alert.alert("Error", "Login failed. Please try again.");
            }
          },
        },
      ]
    );
  }, [username, navigation]);

  const handleClear = useCallback(() => setUsername(""), []);
  const handleChange = useCallback((val) => setUsername(val), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Name</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Type your player name"
          placeholderTextColor="#999"
          value={username}
          onChangeText={handleChange}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          autoCapitalize="words"
          maxLength={22}
        />
        {username.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.buttonWrapper,
          isDisabled && { opacity: 0.5 },
          pressed && { opacity: 0.85 },
        ]}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    position: "absolute",
    right: 12,
    top: 10,
  },
  clearText: {
    fontSize: 18,
    color: "#555",
  },
  buttonWrapper: {
    borderRadius: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
