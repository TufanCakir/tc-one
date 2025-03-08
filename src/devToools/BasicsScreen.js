// src/screens/BasicsScreen.js
import React from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "../styles/BasicsScreenStyles";

export default function BasicsScreen() {
  return (
    <View colors={["#2c3e50", "#000000"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>React Native Basics</Text>
        <Text style={styles.subtitle}>Views, Text & StyleSheets</Text>
        <Text style={styles.description}>
          In React Native the basic building blocks are:
          {"\n\n"}• <Text style={styles.highlight}>View:</Text> The container
          for layout and structure.
          {"\n\n"}• <Text style={styles.highlight}>Text:</Text> To view Text.
          {"\n\n"}• <Text style={styles.highlight}>StyleSheet:</Text> Generated
          and manages styles.
          {"\n\n"}You can combine these components to create appealing Create
          mobile UIs. Try it yourself and match the styles to achieve your
          desired design.
        </Text>
        <Text style={styles.codeTitle}>Example code:</Text>
        <Text style={styles.code}>
          {`import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
      <Text style={styles.paragraph}>
        Dies ist ein einfaches Beispiel, das View, Text und StyleSheet nutzt.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10
  }
});
`}
        </Text>
        <Text style={styles.footer}>
          Write your own code and experiment with different ones Styles, a code
          editor is required.
        </Text>
      </ScrollView>
    </View>
  );
}
