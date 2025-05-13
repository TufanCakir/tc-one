import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const STORAGE_KEY = "@rich_text_content_simple";

const TextEditorScreen = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setText(saved);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    loadContent();
  }, []);

  const handleContentChange = useCallback(async (content) => {
    try {
      setText(content);
      await AsyncStorage.setItem(STORAGE_KEY, content);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>Text Editor</Text>

            <Text style={styles.label}>Inhalt:</Text>

            <ScrollView
              style={styles.editorWrapper}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.editor}
                multiline
                placeholder="Schreib etwas…"
                placeholderTextColor="#888"
                value={text}
                onChangeText={handleContentChange}
              />
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>

      {/* Footer */}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00ff88",
    textAlign: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
    fontWeight: "bold",
  },
  editorWrapper: {
    flex: 1,
  },
  editor: {
    minHeight: 300,
    color: "#fff",
    backgroundColor: "#111",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default TextEditorScreen;
