import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function WebViewScreen() {
  const navigation = useNavigation();
  const videoId = "nT7VJbJyY7I"; // Dein YouTube Video

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <WebView
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.5625, // 16:9 Verhältnis
  },
  backButton: {
    position: "absolute",
    top: 40, // etwas unter der Statusbar
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 20,
  },
});
