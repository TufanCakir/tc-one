import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_IMAGE = "@profile_image_uri";

// Custom Hook für Galerie-Logik
function useGalleryImage() {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // Bildauswahl aus Systemgalerie
  const pickImage = async () => {
    setLoading(true);
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Zugriff verweigert",
          "Bitte erlaube den Zugriff auf deine Fotomediathek."
        );
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await AsyncStorage.setItem(STORAGE_KEY_IMAGE, uri);
      }
    } catch (e) {
      console.warn("Fehler bei der Bildauswahl:", e);
      Alert.alert("Fehler", "Bild konnte nicht geladen werden.");
    }
    setLoading(false);
  };

  // Lade vorhandenes Bild beim Start
  useEffect(() => {
    (async () => {
      try {
        const storedUri = await AsyncStorage.getItem(STORAGE_KEY_IMAGE);
        if (storedUri) setImageUri(storedUri);
      } catch (e) {
        console.warn("Fehler beim Laden des gespeicherten Bildes:", e);
      }
    })();
  }, []);

  return { imageUri, pickImage, loading };
}

export default function GalleryScreen() {
  const { imageUri, pickImage, loading } = useGalleryImage();
  const navigation = useNavigation();

  // Header mit Avatar-Button aktualisieren
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.7}
          style={styles.avatarButton}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../../assets/icon.png")}
              style={styles.avatar}
              accessibilityLabel="Profilbild auswählen"
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, imageUri, pickImage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📂 System-Galerie (iOS-Style)</Text>

      <TouchableOpacity
        style={styles.selectButton}
        activeOpacity={0.7}
        onPress={pickImage}
        disabled={loading}
      >
        <Text style={styles.selectButtonText}>
          {loading ? "Lädt..." : "Foto auswählen"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 16 }}
        />
      )}

      {imageUri && !loading && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 32,
    letterSpacing: 0.4,
  },
  selectButton: {
    backgroundColor: "#222428",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 18,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  imageWrapper: {
    marginTop: 18,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#fff2",
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: "cover",
  },
  avatarButton: {
    marginRight: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff1",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#19191a",
  },
});
