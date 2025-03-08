// src/screens/MiniGamesScreen.js
import React, { useState } from "react";
import { View, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";
import Footer from "../components/Footer";
import MiniGameModal from "../components/MiniGameModal";
import styles from "../styles/MiniGamesStyles";

export default function MiniGamesScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <GradientButton
        title="Start"
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <MiniGameModal
            navigation={navigation}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </Modal>
      <Footer />
    </View>
  );
}
