// src/components/SettingsModal.js
import React from "react";
import { View, FlatList } from "react-native";
import GradientButton from "./GradientButton";
import styles from "../styles/SettingsStyles";

const buttons = [
  { title: "Terms of Service", screen: "TermsOfServiceScreen" },
  { title: "Set Background", screen: "BackgroundSelectionScreen" },
];

export default function SettingsModal({ navigation, onClose, onResetAccount }) {
  return (
    <View style={styles.modalContent}>
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.screen}
        numColumns={3}
        renderItem={({ item }) => (
          <GradientButton
            title={item.title}
            onPress={() => {
              navigation.navigate(item.screen);
              onClose();
            }}
            style={styles.button}
          />
        )}
      />
      <GradientButton
        title="Account Reset"
        onPress={onResetAccount}
        style={styles.resetButton}
      />
      <GradientButton
        title="Close"
        onPress={onClose}
        style={styles.closeButton}
        textStyle={{ fontSize: 30 }}
      />
    </View>
  );
}
