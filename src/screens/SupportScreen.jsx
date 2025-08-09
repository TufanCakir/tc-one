import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

export default function SupportScreen() {
  const sendSupportMail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert(
        "Nicht verfügbar",
        "E-Mail-Versand ist auf diesem Gerät nicht möglich."
      );
      return;
    }

    await MailComposer.composeAsync({
      recipients: ["support@tufancakir.com"],
      subject: "Support-Anfrage – TC One",
      body:
        "Hallo Tufan,\n\nich habe folgendes Anliegen:\n\n" +
        "- Feedback / Idee / Bug:\n" +
        "- Gerät/Plattform:\n" +
        "- App-Version:\n\nDanke!",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kontaktiere den Support</Text>
      <Text style={styles.subtitle}>
        Du hast Feedback, Ideen oder ein Problem? Schick mir eine Mail!
      </Text>

      <TouchableOpacity onPress={sendSupportMail} activeOpacity={0.8}>
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mail an support@tufancakir.com</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
