// src/screens/EmojiPickerScreen.jsx
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import EmojiKeyboard from "rn-emoji-keyboard";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

export default function EmojiPickerScreen() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [recentEmojis, setRecentEmojis] = useState([]);

  const onEmojiSelected = (emoji) => {
    setSelectedEmoji(emoji.emoji);
    setShowKeyboard(false);

    setRecentEmojis((prev) => {
      const updated = [emoji.emoji, ...prev.filter((e) => e !== emoji.emoji)];
      return updated.slice(0, 5);
    });
  };

  const onClose = () => {
    setShowKeyboard(false);
  };

  return (
    <View style={styles.container}>
      {/* Emoji Anzeige */}
      <View style={styles.emojiDisplay}>
        {selectedEmoji ? (
          <Text style={styles.bigEmoji}>{selectedEmoji}</Text>
        ) : (
          <Text style={styles.noEmojiText}>Noch kein Emoji ausgewählt</Text>
        )}
      </View>

      {/* Zuletzt benutzt */}
      {recentEmojis.length > 0 && (
        <View style={styles.recentWrapper}>
          <Text style={styles.recentTitle}>Zuletzt benutzt:</Text>
          <FlatList
            data={recentEmojis}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentEmojiButton}
                onPress={() => setSelectedEmoji(item)}
              >
                <Text style={styles.recentEmoji}>{item}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Button mit LinearGradient */}
      <TouchableOpacity
        onPress={() => setShowKeyboard(true)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pickerButton}
        >
          <Text style={styles.buttonText}>
            {selectedEmoji ? "Emoji ändern" : "Emoji auswählen"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Emoji Picker */}
      <EmojiKeyboard
        open={showKeyboard}
        onEmojiSelected={onEmojiSelected}
        onClose={onClose}
      />

      {/* Footer */}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emojiDisplay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bigEmoji: {
    fontSize: 60,
    textAlign: "center",
  },
  noEmojiText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  pickerButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentWrapper: {
    marginBottom: 20,
  },
  recentTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  recentEmojiButton: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  recentEmoji: {
    fontSize: 28,
  },
  footerWrapper: {
    paddingBottom: 10,
  },
});
