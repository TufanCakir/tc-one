import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Print from "expo-print";

export default function PrintScreen() {
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  // Einfacher HTML-Text drucken
  const printHTML = async () => {
    try {
      await Print.printAsync({
        html: `
          <html>
            <body>
              <h1 style="color: #333; text-align: center;">Hallo von TC One 🎉</h1>
              <p style="text-align: center;">Dies ist ein Testdruck aus meiner Expo-App.</p>
            </body>
          </html>
        `,
        printerUrl: selectedPrinter?.url, // nur iOS
      });
    } catch (error) {
      Alert.alert("Fehler beim Drucken", error.message);
    }
  };

  // iOS: Drucker auswählen
  const selectPrinter = async () => {
    try {
      const printer = await Print.selectPrinterAsync();
      setSelectedPrinter(printer);
    } catch (error) {
      Alert.alert("Fehler beim Auswählen des Druckers", error.message);
    }
  };

  // PDF erstellen und in Vorschau öffnen
  const createPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <html>
            <body>
              <h1>Mein PDF Dokument 📄</h1>
              <p>Erstellt mit expo-print</p>
            </body>
          </html>
        `,
      });
      Alert.alert("PDF erstellt", `Gespeichert unter: ${uri}`);
      console.log("PDF URI:", uri);
    } catch (error) {
      Alert.alert("Fehler beim PDF erstellen", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖨 Print & PDF Beispiel</Text>

      <Button title="📄 HTML drucken" onPress={printHTML} />
      <View style={styles.space} />

      <Button title="📄 PDF erstellen" onPress={createPDF} />
      <View style={styles.space} />

      {selectedPrinter ? (
        <Text style={styles.text}>
          Ausgewählter Drucker: {selectedPrinter.name}
        </Text>
      ) : (
        <Button title="🖨 Drucker auswählen (nur iOS)" onPress={selectPrinter} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  space: {
    height: 15,
  },
  text: {
    marginTop: 20,
    color: "#fff",
  },
});
