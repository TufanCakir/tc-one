// src/screens/HomeScreen.js
import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔹 Speicher für die Nutzungslimitierung
import GradientButton from "../components/GradientButton";
import Footer from "../components/Footer";
import MenuModal from "../components/MenuModal";
import { CoinsContext } from "../context/CoinsContext";
import styles from "../styles/HomeScreenStyles";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { addCoins } = useContext(CoinsContext);
  const [remainingUses, setRemainingUses] = useState(5); // 🔹 Standard: 5 Nutzungen

  useEffect(() => {
    // Lade verbleibende Nutzungen aus AsyncStorage
    const loadUses = async () => {
      try {
        const storedUses = await AsyncStorage.getItem("testModeUses");
        if (storedUses !== null) {
          setRemainingUses(parseInt(storedUses, 10));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Nutzungen:", error);
      }
    };
    loadUses();
  }, []);

  const handleTestMode = async () => {
    if (remainingUses > 0) {
      addCoins(1000);
      alert("1000 Coins have been added!");

      const newUses = remainingUses - 1;
      setRemainingUses(newUses);

      try {
        await AsyncStorage.setItem("testModeUses", newUses.toString());
      } catch (error) {
        console.error("Fehler beim Speichern der Nutzungen:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <GradientButton
        title="Menü"
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      />

      {remainingUses > 0 && (
        <>
          <GradientButton
            title={`Add 1000 Coins (${remainingUses}x)`}
            onPress={handleTestMode}
            style={styles.testModeButton}
          />
          <Text style={styles.thankYouText}>
            Thank you for your support! You can claim this bonus {remainingUses}{" "}
            more times. 🎉
          </Text>
        </>
      )}

      <MenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <Footer />
    </View>
  );
}
