// src/components/DevToolModal.js
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "./GradientButton";
import styles from "../styles/DevToolStyles";

const DevToolModal = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>React Native Basics</Text>
        <Text style={styles.modalDescription}>
          Learn the basics: views, text, style sheets and much more!
        </Text>
        <GradientButton
          title="Navigate to Basics"
          onPress={() => {
            onClose();
            navigation.navigate("BasicsScreen");
          }}
          style={styles.modalButton}
        />
        <GradientButton
          title="Close"
          onPress={onClose}
          style={styles.modalButton}
        />
      </View>
    </View>
  );
};

export default DevToolModal;
