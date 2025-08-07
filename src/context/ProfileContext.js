import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext();

const STORAGE_KEY_IMAGE = "@profile_image_uri";
const STORAGE_KEY_NAME = "@profile_name";

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");

  // Profilbild laden
  const loadProfileImage = async () => {
    try {
      const uri = await AsyncStorage.getItem(STORAGE_KEY_IMAGE);
      if (uri) setProfileImage(uri);
    } catch (e) {
      console.warn("Failed to load profile image:", e);
    }
  };

  // Profilbild setzen + speichern
  const updateProfileImage = async (uri) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_IMAGE, uri);
      setProfileImage(uri);
    } catch (e) {
      console.warn("Failed to save profile image:", e);
    }
  };

  // Name laden
  const loadProfileName = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY_NAME);
      if (name) setProfileName(name);
    } catch (e) {
      console.warn("Failed to load profile name:", e);
    }
  };

  // Name setzen + speichern
  const updateProfileName = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NAME, name);
      setProfileName(name);
    } catch (e) {
      console.warn("Failed to save profile name:", e);
    }
  };

  // Beim Start beides laden
  useEffect(() => {
    loadProfileImage();
    loadProfileName();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        loadProfileImage,
        profileName,
        updateProfileName,
        loadProfileName,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
