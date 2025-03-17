// src/screens/NewsScreen.js
import React from "react";
import { View, ScrollView, Text } from "react-native";
import UpdateSection from "../components/UpdateSection";
import styles from "../styles/NewsStyles";
import Footer from "../components/Footer";

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Update 1 */}
        <UpdateSection
          title="App Version v1.0.5"
          details={[
            "Bug fixes Footer added And everyone gets 1,000 coins (a total of 5,000 coins) as compensation",
          ]}
        />

        {/* Update 2 */}
        <UpdateSection title="Next Major Update" details={["Coming Soon"]} />

        {/* Closing info */}
        <Text style={styles.footerText}>
          Stay tuned for more cool features!
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
}
