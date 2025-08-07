import React from "react";
import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import * as SMS from "expo-sms";
import { LinearGradient } from "expo-linear-gradient";

export default function SmsScreen() {
  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert("Not Available", "SMS is not supported on this device.");
      return;
    }

    const { result } = await SMS.sendSMSAsync(
      ["015112345678"], // recipient
      "Hello from TC One! This is a test message. 😊"
    );

    if (result === "sent") {
      Alert.alert("Success", "SMS was sent successfully!");
    } else if (result === "cancelled") {
      Alert.alert("Cancelled", "SMS sending was cancelled.");
    } else {
      Alert.alert("Error", "SMS could not be sent.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📩 Send SMS</Text>

      <Pressable
        onPress={sendSMS}
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && { opacity: 0.9 },
        ]}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send SMS</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  buttonWrapper: {
    borderRadius: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
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
    fontSize: 16,
    fontWeight: "600",
  },
});
