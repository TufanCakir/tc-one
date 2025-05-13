import { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const STORAGE_KEY = "@rich_text_content";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor, fontWeight: "bold" }}>H1</Text>
);

const TextEditorScreen = () => {
  const richText = useRef();
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setInitialContent(saved);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    })();
  }, []);

  const handleContentChange = useCallback(async (content) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, content);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Pressable fängt alle Taps außerhalb des Editors ab */}
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>📝 Text Editor</Text>

            <RichToolbar
              style={styles.toolbar}
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.heading1,
                actions.insertOrderedList,
                actions.insertBulletsList,
                actions.insertLink,
              ]}
              iconMap={{ [actions.heading1]: handleHead }}
            />

            <Text style={styles.label}>Inhalt:</Text>

            <ScrollView
              style={styles.editorWrapper}
              keyboardShouldPersistTaps="always" // <<< hier
              keyboardDismissMode="on-drag" // oder "interactive" auf iOS
            >
              <RichEditor
                ref={richText}
                initialContentHTML={initialContent}
                onChange={handleContentChange}
                placeholder="Schreibe hier..."
                style={styles.editor}
                editorStyle={{
                  backgroundColor: "#111",
                  color: "#fff",
                  placeholderColor: "#aaa",
                }}
              />
              {/* Leerbereich als Touch-Zone */}
              <View style={{ height: 150 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>

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
    padding: 10,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00ff88",
    textAlign: "center",
    marginVertical: 10,
  },
  toolbar: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 10,
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
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  footerWrapper: {
    marginTop: 10,
  },
});

export default TextEditorScreen;
