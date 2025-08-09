import { useState, useEffect, useRef } from "react";
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
    </SafeAreaView>
  );
}
