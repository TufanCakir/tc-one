import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themes from "../data/theme.json";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  // Lade gespeichertes Theme beim Start
  useEffect(() => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
      if (storedTheme) setThemeName(storedTheme);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeName === "light" ? "dark" : "light";
    setThemeName(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const theme = themes[themeName] || themes.light;

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      <StatusBar barStyle={theme.statusBar} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
