import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Footer from "../components/Footer";

const DEFAULT_TEXT =
  "React Native ist ein Open-Source-Framework von Meta (ehemals Facebook), mit dem Entwickler mobile Anwendungen für iOS und Android mit JavaScript und React entwickeln können. Es nutzt native UI-Komponenten für hohe Performance und ermöglicht Code-Wiederverwendbarkeit zwischen den Plattformen.";
const TEST_DURATION = 60; // Sekunden

const TypingSpeedMonitorScreen = () => {
  const [targetText] = useState(DEFAULT_TEXT);
  const [inputText, setInputText] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  // Countdown-Timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            finishTest();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  // Live-WPM-Berechnung
  useEffect(() => {
    if (isActive && startTime) {
      const elapsed = (Date.now() - startTime) / 1000;
      const wordsTyped = inputText.trim().split(/\s+/).filter(Boolean).length;
      setWpm(Math.round((wordsTyped / elapsed) * 60));
    }
  }, [inputText]);

  const startTest = useCallback(() => {
    clearInterval(timerRef.current);
    setInputText("");
    setErrors(0);
    setTimeLeft(TEST_DURATION);
    setWpm(0);
    setStartTime(Date.now());
    setIsActive(true);
  }, []);

  // Fehler nur für tatsächlich getippte Wörter zählen
  const calculateErrors = useCallback(() => {
    const targetWords = targetText.split(/\s+/);
    const typedWords = inputText.trim().split(/\s+/).filter(Boolean);
    let errs = 0;
    typedWords.forEach((word, index) => {
      if (word !== targetWords[index]) {
        errs++;
      }
    });
    setErrors(errs);
    return errs;
  }, [inputText, targetText]);

  const finishTest = useCallback(() => {
    setIsActive(false);
    clearInterval(timerRef.current);
    const finalErrors = calculateErrors();
    // Finales WPM neu berechnen
    const elapsed = (Date.now() - startTime) / 1000;
    const wordsTyped = inputText.trim().split(/\s+/).filter(Boolean).length;
    const finalWpm = Math.round((wordsTyped / elapsed) * 60);
    setWpm(finalWpm);
    Alert.alert(
      "Zeit abgelaufen!",
      `Ihre Geschwindigkeit: ${finalWpm} WPM\nFehler: ${finalErrors}`
    );
  }, [calculateErrors, inputText, startTime]);

  const resetTest = useCallback(() => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setInputText("");
    setErrors(0);
    setWpm(0);
    setTimeLeft(TEST_DURATION);
    setStartTime(null);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Schreibgeschwindigkeitstest</Text>
          <View style={styles.infoBar}>
            <Text style={styles.timer}>Zeit: {timeLeft}s</Text>
            <Text style={styles.wpm}>WPM: {wpm}</Text>
            <Text style={styles.errors}>Fehler: {errors}</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.targetText}>{targetText}</Text>
          </View>
          <TextInput
            style={styles.input}
            multiline
            editable={isActive}
            placeholder={isActive ? "Hier tippen…" : "Drücke Start"}
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical="top"
          />
          <View style={styles.buttonRow}>
            {!isActive ? (
              <TouchableOpacity style={styles.startBtn} onPress={startTest}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.stopBtn} onPress={finishTest}>
                <Text style={styles.buttonText}>Stopp</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.resetBtn} onPress={resetTest}>
              <Text style={styles.buttonText}>Zurücksetzen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 20 },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timer: { fontSize: 18, color: "#fff" },
  wpm: { fontSize: 18, color: "#4caf50" },
  errors: { fontSize: 18, color: "#f44336" },
  textBox: {
    backgroundColor: "#3a3f47",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  targetText: { fontSize: 16, color: "#fff" },
  input: {
    minHeight: 100,
    backgroundColor: "#1e2229",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  startBtn: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  stopBtn: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  resetBtn: {
    backgroundColor: "#607d8b",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default TypingSpeedMonitorScreen;
