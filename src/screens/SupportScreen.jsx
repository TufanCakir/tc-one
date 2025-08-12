import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Footer from "../components/Footer";

export default function SupportScreen() {
  const sendSupportMail = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert(
        "Not Available",
        "Email sending is not supported on this device."
      );
      return;
    }

    await MailComposer.composeAsync({
      recipients: ["support@tufancakir.com"],
      subject: "Support Request – TC One",
      body:
        "Hello Tufan,\n\nI have the following request:\n\n" +
        "- Feedback / Idea / Bug:\n" +
        "- Device / Platform:\n" +
        "- App Version:\n\nThank you!",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <Text style={styles.subtitle}>
        Have feedback, ideas, or an issue? Send me a message anytime.
      </Text>

      <TouchableOpacity
        onPress={sendSupportMail}
        activeOpacity={0.85}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Email support@tufancakir.com</Text>
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
    fontSize: 26,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 28,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
