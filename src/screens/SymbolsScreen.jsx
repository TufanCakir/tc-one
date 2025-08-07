import { SymbolView, SymbolViewProps, SFSymbol } from "expo-symbols";
import { StyleSheet, View } from "react-native";

export default function SymbolsScreen() {
  return (
    <View style={styles.container}>
      <SymbolView
        name="airpods.chargingcase"
        style={styles.symbol}
        type="hierarchical"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
});
