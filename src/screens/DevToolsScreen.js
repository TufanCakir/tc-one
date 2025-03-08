// src/screens/DevToolScreen.js
import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import GradientButton from "../components/GradientButton";
import Footer from "../components/Footer";
import DevToolModal from "../components/DevToolModal";
import styles from "../styles/DevToolStyles";

export default function DevToolScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Learn React Native with practical examples and useful tips.
      </Text>
      <GradientButton
        title="Learn more"
        onPress={() => setModalVisible(true)}
        style={styles.button}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <DevToolModal onClose={() => setModalVisible(false)} />
      </Modal>
      <Footer />
    </View>
  );
}
