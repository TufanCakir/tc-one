import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Magnetometer } from "expo-sensors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");
const COMPASS_SIZE = width * 0.8;

const getCardinal = (deg) => {
  if (deg >= 337.5 || deg < 22.5) return "N";
  if (deg >= 22.5 && deg < 67.5) return "NE";
  if (deg >= 67.5 && deg < 112.5) return "E";
  if (deg >= 112.5 && deg < 157.5) return "SE";
  if (deg >= 157.5 && deg < 202.5) return "S";
  if (deg >= 202.5 && deg < 247.5) return "SW";
  if (deg >= 247.5 && deg < 292.5) return "W";
  return "NW";
};

const CompassScreen = () => {
  const [heading, setHeading] = useState(0);
  const rotateAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);
    const subscription = Magnetometer.addListener(({ x, y }) => {
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle >= 0 ? angle : angle + 360;
      setHeading(Math.round(angle));
      Animated.timing(rotateAnim, {
        toValue: angle,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        Himmelsrichtung: {getCardinal(heading)} ({heading}°)
      </Text>
      <View style={styles.compassContainer}>
        <MaterialCommunityIcons
          name="compass-outline"
          size={COMPASS_SIZE}
          color="#555"
          style={styles.compassBackground}
        />
        <Animated.View
          style={[
            styles.arrowContainer,
            { transform: [{ rotate: `${360 - heading}deg` }] },
          ]}
        >
          <MaterialIcons
            name="navigation"
            size={COMPASS_SIZE * 0.5}
            color="#fff"
          />
        </Animated.View>
      </View>
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  compassContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  compassBackground: {
    position: "absolute",
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default CompassScreen;
