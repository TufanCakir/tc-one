import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import * as SMS from "expo-sms";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

const RECIPIENTS = ["015112345678"]; // Direktnummer → keine Kontaktberechtigung nötig
const MESSAGE = "Schickt mir Feedback, Ideen, Bugs. Danke!";
const GRADIENT_COLORS = ["#000000", "#555555"];

export default function SmsScreen() {
  const sendSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        return Alert.alert(
          "Nicht verfügbar",
          "SMS wird auf diesem Gerät nicht unterstützt."
        );
      }

      const { result } = await SMS.sendSMSAsync(RECIPIENTS, MESSAGE);

      const messages = {
        sent: ["Erfolg", "SMS wurde erfolgreich gesendet!"],
        cancelled: ["Abgebrochen", "Das Senden der SMS wurde abgebrochen."],
        default: ["Fehler", "Die SMS konnte nicht gesendet werden."],
      };

      Alert.alert(...(messages[result] || messages.default));
    } catch (error) {
      console.error("SMS-Fehler:", error);
      Alert.alert("Fehler", "Beim Senden ist ein Problem aufgetreten.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS senden</Text>

      <Pressable
        onPress={sendSMS}
        accessibilityLabel="Drücke hier, um eine SMS zu senden"
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && { opacity: 0.85 },
        ]}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>SMS senden</Text>
        </LinearGradient>
      </Pressable>

      <FooterWrapper />
    </View>
  );
}

function FooterWrapper() {
  return (
    <View style={styles.footerWrapper}>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60, // Platz für Footer
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: "hidden", // Gradient sauber abschneiden
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
