// context/ProfileContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");

  // Name updaten + speichern
  const updateProfileName = useCallback(async (newName) => {
    try {
      setProfileName(newName);
      await AsyncStorage.setItem("profileName", newName);
    } catch (error) {
      console.error("Fehler beim Speichern des Namens:", error);
    }
  }, []);

  // Bild updaten + speichern
  const updateProfileImage = useCallback(async (newImage) => {
    try {
      setProfileImage(newImage);
      await AsyncStorage.setItem("profileImage", newImage);
    } catch (error) {
      console.error("Fehler beim Speichern des Bildes:", error);
    }
  }, []);

  // Beim Starten aus Storage laden
  useEffect(() => {
    (async () => {
      try {
        const savedImage = await AsyncStorage.getItem("profileImage");
        const savedName = await AsyncStorage.getItem("profileName");

        if (savedImage) setProfileImage(savedImage);
        if (savedName) setProfileName(savedName);
      } catch (error) {
        console.error("Fehler beim Laden des Profils:", error);
      }
    })();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        profileName,
        updateProfileName,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
