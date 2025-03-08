// src/screens/NewsScreen.js
import React from "react";
import { View, ScrollView, Text } from "react-native";
import UpdateSection from "../components/UpdateSection";
import styles from "../styles/NewsStyles";

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Update 1 */}
        <UpdateSection
          title="App Version v1.0.4"
          details={["Welcome to My All In One App"]}
        />

        {/* Update 2 */}
        <UpdateSection title="Next Major Update" details={["Coming Soon"]} />

        {/* Closing info */}
        <Text style={styles.footerText}>
          Stay tuned for more cool features!
        </Text>
      </ScrollView>
    </View>
  );
}
