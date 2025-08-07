import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientWrapper({
  colors = ["#000000 ", "#ffffff"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}) {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.defaultStyle, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    padding: 16,
  },
});
