import { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/JournalScreenStyles";

const STORAGE_KEY = "@journal_entries";

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const scrollRef = useRef();

  // 🔹 Einträge aus Storage laden
  const loadEntries = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch (e) {
      console.warn("Fehler beim Laden der Einträge", e);
    }
  }, []);

  // 🔹 Einträge in Storage speichern
  const saveEntries = useCallback(async (newEntries) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (e) {
      console.warn("Fehler beim Speichern", e);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    saveEntries(entries);
  }, [entries, saveEntries]);

  // 🔹 Neuer Eintrag
  const handleAddEntry = useCallback(() => {
    setEntries((prev) => [...prev, ""]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  // 🔹 Textänderung
  const handleChangeText = useCallback(
    (text, index) => {
      const updated = [...entries];
      updated[index] = text;
      setEntries(updated);
    },
    [entries]
  );

  // 🔹 Eintrag löschen
  const handleDeleteEntry = useCallback((index) => {
    Alert.alert("Eintrag löschen", "Diesen Eintrag wirklich löschen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => setEntries((prev) => prev.filter((_, i) => i !== index)),
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Scrollbereich */}
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
                  placeholderTextColor="#888"
                  value={entry}
                  onChangeText={(text) => handleChangeText(text, index)}
                />
                <TouchableOpacity
                  style={[styles.addBtn, styles.deleteBtn, { marginTop: 6 }]}
                  onPress={() => handleDeleteEntry(index)}
                >
                  <Text style={styles.addBtnText}>Löschen</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddEntry}>
            <Text style={styles.addBtnText}>Neuer Eintrag</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
