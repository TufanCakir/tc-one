// context/ProfileContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    (async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImage(savedImage);
      }
    })();
  }, []);

  const updateProfileImage = async (newImage) => {
    try {
      await AsyncStorage.setItem("profileImage", newImage);
      setProfileImage(newImage); // ⬅️ Wichtig: sofort State ändern
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
