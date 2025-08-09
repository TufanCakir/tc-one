import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

export default function QRCodeGenerator() {
  const [qrValue, setQRValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const generateQRCode = () => {
    if (!qrValue) return;
    setIsActive(true);
  };

  const handleInputChange = (text) => {
    setQRValue(text);
    if (!text) {
      setIsActive(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR Code Generator</Text>
        <Text style={styles.description}>
          Paste a URL or enter text to create a QR code
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text or URL"
          placeholderTextColor="#aaa"
          value={qrValue}
          onChangeText={handleInputChange}
        />

        <TouchableOpacity onPress={generateQRCode} activeOpacity={0.8}>
          <LinearGradient
            colors={["#000000", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </LinearGradient>
        </TouchableOpacity>

        {isActive && (
          <View style={styles.qrCode}>
            <QRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"
            />
          </View>
        )}
      </View>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrCode: {
    marginTop: 24,
    alignItems: "center",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
