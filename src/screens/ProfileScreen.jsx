import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useProfile } from "../context/ProfileContext"; // ✅

export default function ProfileScreen() {
  const { profileImage, updateProfileImage } = useProfile();

  const pickAndSaveProfileImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Zugriff verweigert",
          "Bitte erlaube den Zugriff auf deine Galerie."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (result.canceled) return;

      const uri = result.assets?.[0]?.uri;
      if (!uri) {
        Alert.alert("Fehler", "Kein Bild gefunden.");
        return;
      }

      await updateProfileImage(uri); // ✅ global speichern
      Alert.alert("Erfolg", "Profilbild wurde gespeichert!");
    } catch (error) {
      console.error("Profilbild-Fehler:", error);
      Alert.alert("Fehler", "Beim Speichern ist ein Problem aufgetreten.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Profilbild auswählen</Text>

      {profileImage && (
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={pickAndSaveProfileImage}>
        <Text style={styles.buttonText}>Bild aus Galerie wählen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#444",
  },
  button: {
    backgroundColor: "#222428",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
