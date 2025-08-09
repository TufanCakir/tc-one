import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import * as Print from "expo-print";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

export default function PrintScreen() {
  const [title, setTitle] = useState("Mein PDF Dokument 📄");
  const [content, setContent] = useState(
    "Dies ist ein dynamisch erstelltes Dokument."
  );
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const generateHTML = () => `
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h1 style="color: #333; text-align: center;">${title}</h1>
        <p style="text-align: center;">${content}</p>
      </body>
    </html>
  `;

  const printDocument = async () => {
    try {
      await Print.printAsync({
        html: generateHTML(),
        printerUrl: selectedPrinter?.url,
      });
    } catch (error) {
      Alert.alert("Fehler beim Drucken", error.message);
    }
  };

  const createPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: generateHTML(),
      });
      Alert.alert("PDF erstellt", `Gespeichert unter: ${uri}`);
      console.log("PDF URI:", uri);
    } catch (error) {
      Alert.alert("Fehler beim PDF erstellen", error.message);
    }
  };

  const selectPrinter = async () => {
    try {
      const printer = await Print.selectPrinterAsync();
      setSelectedPrinter(printer);
    } catch (error) {
      Alert.alert("Fehler beim Auswählen des Druckers", error.message);
    }
  };

  const GradientButton = ({ text, onPress }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.85 }}
    >
      <LinearGradient
        colors={["#000000", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
      >
        <Text style={styles.title}>📄 Dokument erstellen</Text>

        <TextInput
          style={styles.input}
          placeholder="Titel eingeben"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Inhalt eingeben"
          placeholderTextColor="#888"
          multiline
          value={content}
          onChangeText={setContent}
        />

        <GradientButton text="🖨 Dokument drucken" onPress={printDocument} />
        <View style={styles.space} />
        <GradientButton text="💾 Als PDF speichern" onPress={createPDF} />
        <View style={styles.space} />
        <GradientButton
          text="📡 Drucker auswählen (nur iOS)"
          onPress={selectPrinter}
        />

        {selectedPrinter && (
          <Text style={styles.printerText}>
            Ausgewählter Drucker: {selectedPrinter.name}
          </Text>
        )}

        <Text style={styles.previewTitle}>📄 Vorschau:</Text>
        <View style={styles.previewBox}>
          <Text style={styles.previewHTML}>{generateHTML()}</Text>
        </View>
      </ScrollView>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
  input: {
    width: "90%",
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  space: { height: 10 },
  printerText: { color: "#aaa", marginTop: 10 },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "#fff",
  },
  previewBox: {
    backgroundColor: "#111",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: "90%",
  },
  previewHTML: {
    fontSize: 12,
    color: "#0f0",
    fontFamily: "monospace",
  },
  footerWrapper: { position: "absolute", bottom: 0, width: "100%" },
});
