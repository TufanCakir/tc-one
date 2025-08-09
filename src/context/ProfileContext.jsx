// context/ProfileContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  IMAGE: "profileImage",
  NAME: "profileName",
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(true);

  // Profil laden
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [savedImage, savedName] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.IMAGE),
          AsyncStorage.getItem(STORAGE_KEYS.NAME),
        ]);

        if (isMounted) {
          if (savedImage) setProfileImage(savedImage);
          if (savedName) setProfileName(savedName);
        }
      } catch (error) {
        console.error("[ProfileContext] Fehler beim Laden des Profils:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Name aktualisieren
  const updateProfileName = useCallback(async (newName) => {
    try {
      setProfileName(newName);
      await AsyncStorage.setItem(STORAGE_KEYS.NAME, newName);
    } catch (error) {
      console.error(
        "[ProfileContext] Fehler beim Speichern des Namens:",
        error
      );
    }
  }, []);

  // Bild aktualisieren
  const updateProfileImage = useCallback(async (newImage) => {
    try {
      setProfileImage(newImage);
      await AsyncStorage.setItem(STORAGE_KEYS.IMAGE, newImage);
    } catch (error) {
      console.error(
        "[ProfileContext] Fehler beim Speichern des Bildes:",
        error
      );
    }
  }, []);

  // Alles zurücksetzen
  const resetProfile = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.IMAGE, STORAGE_KEYS.NAME]);
      setProfileImage(null);
      setProfileName("");
    } catch (error) {
      console.error("[ProfileContext] Fehler beim Zurücksetzen:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      profileImage,
      updateProfileImage,
      profileName,
      updateProfileName,
      resetProfile,
      loading,
    }),
    [
      profileImage,
      profileName,
      updateProfileImage,
      updateProfileName,
      resetProfile,
      loading,
    ]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error(
      "useProfile muss innerhalb eines ProfileProviders verwendet werden."
    );
  }
  return ctx;
};
