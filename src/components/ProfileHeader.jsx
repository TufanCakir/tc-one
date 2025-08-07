import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useProfile } from "../context/ProfileContext";

const STORAGE_KEY_NAME = "@profile_name";
const STORAGE_KEY_ICON = "@profile_icon";

const ProfileHeader = () => {
  const { profileImage, profileName } = useProfile(); // globales Profilbild
  const [name, setName] = useState("");
  const [iconConfig, setIconConfig] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storedName = await AsyncStorage.getItem(STORAGE_KEY_NAME);
        const storedIconName = await AsyncStorage.getItem(STORAGE_KEY_ICON);

        if (storedName) setName(storedName);

        if (storedIconName) {
          const match = ICON_OPTIONS.find((opt) => opt.name === storedIconName);
          if (match) {
            setIconConfig(match);
          }
        }
      } catch (e) {
        console.warn("❌ Fehler beim Laden der Header-Daten:", e);
      }
    })();
  }, []);

  const Icon = iconConfig?.lib;

  return (
    <View style={styles.container}>
      {/* Profilbild anzeigen, falls vorhanden */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.image} />
      ) : Icon ? (
        <Icon
          name={iconConfig.name}
          size={36}
          color="#3498db"
          style={styles.icon}
        />
      ) : null}

      <Text style={styles.text}>{profileName || "Unnamed"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  icon: {
    marginRight: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ProfileHeader;
