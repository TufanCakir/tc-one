// src/screens/EmojiPickerScreen.jsx
import { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import EmojiKeyboard from "rn-emoji-keyboard";
import styles from "../styles/EmojiPickerStyles";
import Footer from "../components/Footer";

export default function EmojiPickerScreen() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // Wird aufgerufen, wenn ein Emoji ausgewählt wurde
  const onEmojiSelected = (emoji) => {
    setSelectedEmoji(emoji.emoji);
    setShowKeyboard(false);
  };

  // Schließt den Emoji-Picker
  const onClose = () => {
    setShowKeyboard(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowKeyboard(true)}
        style={styles.pickerButton}
      >
        <Text style={styles.buttonText}>Open Emoji Picker</Text>
      </TouchableOpacity>

      {selectedEmoji !== "" && (
        <Text style={styles.selectedEmoji}>
          Selected Emoji: {selectedEmoji}
        </Text>
      )}

      {/* Der EmojiKeyboard wird immer gerendert und die Sichtbarkeit über "open" gesteuert */}
      <EmojiKeyboard
        open={showKeyboard}
        onEmojiSelected={onEmojiSelected}
        onClose={onClose}
      />
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}
