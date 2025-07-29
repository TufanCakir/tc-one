import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const STORAGE_KEY_NAME = "@profile_name";
const STORAGE_KEY_ICON = "@profile_icon";

const ICON_OPTIONS = [
  { name: "face", lib: MaterialIcons },
  { name: "user-circle", lib: FontAwesome },
  { name: "person-circle", lib: Ionicons },
  { name: "account", lib: MaterialCommunityIcons },

  // Weitere Icons:
  { name: "person-outline", lib: Ionicons },
  { name: "user", lib: FontAwesome },
  { name: "account-circle-outline", lib: MaterialCommunityIcons },
  { name: "person-pin", lib: MaterialIcons },
  { name: "user-alt", lib: FontAwesome5 }, // du musst FontAwesome5 importieren
];

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0]);

  useEffect(() => {
    // Load saved profile
    (async () => {
      try {
        const storedName = await AsyncStorage.getItem(STORAGE_KEY_NAME);
        const storedIconName = await AsyncStorage.getItem(STORAGE_KEY_ICON);
        if (storedName) setName(storedName);
        if (storedIconName) {
          const found = ICON_OPTIONS.find((opt) => opt.name === storedIconName);
          if (found) setSelectedIcon(found);
        }
      } catch (e) {
        console.warn("Failed loading profile", e);
      }
    })();
  }, []);

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert("Fehler", "Bitte gib einen Namen ein.");
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NAME, name);
      await AsyncStorage.setItem(STORAGE_KEY_ICON, selectedIcon.name);
      Alert.alert("Erfolg", "Profil gespeichert.");
    } catch (e) {
      console.warn("Save failed", e);
      Alert.alert("Fehler", "Profil konnte nicht gespeichert werden.");
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Profil</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Dein Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Icon auswählen</Text>
          <View style={styles.iconsRow}>
            {ICON_OPTIONS.map((opt) => {
              const IconComponent = opt.lib;
              const isSelected = opt.name === selectedIcon.name;
              return (
                <TouchableOpacity
                  key={opt.name}
                  style={[styles.iconBtn, isSelected && styles.iconSelected]}
                  onPress={() => setSelectedIcon(opt)}
                >
                  <IconComponent
                    name={opt.name}
                    size={36}
                    color={isSelected ? "#3498db" : "#555"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Vorschau:</Text>
          <selectedIcon.lib name={selectedIcon.name} size={48} color="#333" />
          <Text style={styles.previewName}>{name || "Dein Name"}</Text>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveBtnText}>Speichern</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  section: { marginBottom: 24 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  iconsRow: { flexDirection: "row", flexWrap: "wrap" },
  iconBtn: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  iconSelected: {
    backgroundColor: "#fff",
  },
  preview: { alignItems: "center", marginBottom: 24 },
  previewLabel: { fontSize: 16, marginBottom: 8 },
  previewName: { fontSize: 18, marginTop: 8 },
  saveBtn: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
