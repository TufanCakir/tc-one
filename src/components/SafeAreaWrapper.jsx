// components/SafeAreaWrapper.jsx
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function SafeAreaWrapper({
  children,
  edges = ["top", "bottom"],
}) {
  return (
    <SafeAreaView style={styles.container} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
