import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const STORAGE_KEY = "@journal_entries";

const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setEntries(JSON.parse(stored));
      } catch (e) {
        console.warn("Fehler beim Laden der Einträge", e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (e) {
        console.warn("Fehler beim Speichern", e);
      }
    })();
  }, [entries]);

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, ""]);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleChangeText = (text, index) => {
    const updated = [...entries];
    updated[index] = text;
    setEntries(updated);
  };

  const handleDeleteEntry = () => {
    if (entries.length === 0) {
      Alert.alert("Keine Einträge", "Es gibt keinen Eintrag zum Löschen.");
      return;
    }

    Alert.alert("Eintrag löschen", "Letzten Eintrag wirklich löschen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => setEntries((prev) => prev.slice(0, -1)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Scrollbereich mit fester Höhe */}
        <View style={styles.scrollWrapper}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.entriesContainer}
            keyboardShouldPersistTaps="handled"
          >
            {entries.map((entry, index) => (
              <View key={index} style={styles.entryBlock}>
                <Text style={styles.entryLabel}>Eintrag {index + 1}</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder="Schreibe hier deine Gedanken..."
                  value={entry}
                  onChangeText={(text) => handleChangeText(text, index)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Buttons unter dem Scrollbereich */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddEntry}>
            <Text style={styles.addBtnText}>Neuer Eintrag</Text>
          </TouchableOpacity>

          {entries.length > 0 && (
            <TouchableOpacity
              style={[styles.addBtn, styles.deleteBtn]}
              onPress={handleDeleteEntry}
            >
              <Text style={styles.addBtnText}>Löschen</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Fester Footer */}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollWrapper: {
    height: Dimensions.get("window").height * 0.5, // ca. 50 % der Bildschirmhöhe
  },
  entriesContainer: {
    paddingBottom: 16,
  },
  entryBlock: {
    marginBottom: 24,
  },
  entryLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  deleteBtn: {
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shado
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 1,
  },
});

export default JournalScreen;
