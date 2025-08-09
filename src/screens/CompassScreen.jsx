import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");
const COMPASS_SIZE = width * 0.8;

// Grad in Himmelsrichtungen umwandeln
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

export default function CompassScreen() {
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const rotateAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    let isMounted = true;

    // GPS-Berechtigung abfragen
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Standort deaktiviert",
          "Bitte Standortzugriff erlauben, um GPS-Daten anzuzeigen."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      if (isMounted) setLocation(loc.coords);
    })();

    // Magnetometer starten
    Magnetometer.isAvailableAsync().then((available) => {
      if (!available) {
        Alert.alert(
          "Kompass nicht verfügbar",
          "Dein Gerät unterstützt keinen Magnetometer."
        );
        return;
      }

      Magnetometer.setUpdateInterval(100);
      const subscription = Magnetometer.addListener(({ x, y }) => {
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        angle = angle >= 0 ? angle : angle + 360;

        if (isMounted) {
          setHeading(Math.round(angle));
          Animated.timing(rotateAnim, {
            toValue: angle,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      });

      return () => subscription.remove();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        {getCardinal(heading)} ({heading}°)
      </Text>

      {location && (
        <Text style={styles.locationText}>
          Lat: {location.latitude.toFixed(5)} | Lon:{" "}
          {location.longitude.toFixed(5)}
        </Text>
      )}

      <View style={styles.compassContainer}>
        <MaterialCommunityIcons
          name="compass-outline"
          size={COMPASS_SIZE}
          color="#555"
          style={styles.compassBackground}
        />
        <Animated.View
          style={[styles.arrowContainer, { transform: [{ rotate: rotation }] }]}
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
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  headingText: { fontSize: 24, color: "#fff", marginBottom: 10 },
  locationText: { fontSize: 16, color: "#aaa", marginBottom: 20 },
  compassContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  compassBackground: { position: "absolute" },
  arrowContainer: { alignItems: "center", justifyContent: "center" },
  footerWrapper: { position: "absolute", bottom: 0, width: "100%" },
});
