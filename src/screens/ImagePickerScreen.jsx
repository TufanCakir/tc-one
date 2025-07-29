import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Footer from "../components/Footer";

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // Berechtigungen prüfen
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Zugriff verweigert",
        "Bitte erlaube den Zugriff auf deine Galerie."
      );
      return;
    }

    // Galerie öffnen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Kamera-Berechtigung prüfen
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Zugriff verweigert",
        "Bitte erlaube den Zugriff auf die Kamera."
      );
      return;
    }

    // Kamera öffnen
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bild auswählen oder aufnehmen</Text>
      <Button title="📂 Bild aus Galerie wählen" onPress={pickImage} />
      <Button title="📸 Foto aufnehmen" onPress={takePhoto} />

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
