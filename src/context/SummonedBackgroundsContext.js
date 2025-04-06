import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SummonedBackgroundsContext = createContext();

export const SummonedBackgroundsProvider = ({ children }) => {
  const [summonedBackgrounds, setSummonedBackgrounds] = useState([]);

  // Lade die beschworenen Hintergründe aus AsyncStorage beim Start
  useEffect(() => {
    const loadSummonedBackgrounds = async () => {
      try {
        const storedBackgrounds = await AsyncStorage.getItem(
          "summonedBackgrounds"
        );
        if (storedBackgrounds !== null) {
          setSummonedBackgrounds(JSON.parse(storedBackgrounds));
        }
      } catch (error) {
        console.error("Error loading summoned backgrounds:", error);
      }
    };
    loadSummonedBackgrounds();
  }, []);

  // Speichere die beschworenen Hintergründe, wenn sich der Zustand ändert
  useEffect(() => {
    const saveSummonedBackgrounds = async () => {
      try {
        await AsyncStorage.setItem(
          "summonedBackgrounds",
          JSON.stringify(summonedBackgrounds)
        );
      } catch (error) {
        console.error("Error saving summoned backgrounds:", error);
      }
    };
    saveSummonedBackgrounds();
  }, [summonedBackgrounds]);

  return (
    <SummonedBackgroundsContext.Provider
      value={{ summonedBackgrounds, setSummonedBackgrounds }}
    >
      {children}
    </SummonedBackgroundsContext.Provider>
  );
};
