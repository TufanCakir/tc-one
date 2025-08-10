import { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapsScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const DEFAULT_REGION = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const [region, setRegion] = useState(DEFAULT_REGION);
  const [mapType, setMapType] = useState("standard");
  const [myCoord, setMyCoord] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPermissionAndLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Berechtigung benötigt",
          "Bitte erlaube den Standortzugriff in den Geräteeinstellungen."
        );
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const userLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      setMyCoord(userLocation);
      const newRegion = {
        ...userLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 600);
    } catch (err) {
      console.error("Fehler beim Laden des Standorts:", err);
      Alert.alert("Fehler", "Standort konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPermissionAndLocation();
  }, [getPermissionAndLocation]);

  const recenter = () => {
    if (!myCoord) return;
    mapRef.current?.animateToRegion(
      { ...myCoord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      600
    );
  };

  const toggleMapType = () => {
    setMapType((prev) =>
      prev === "standard"
        ? "satellite"
        : prev === "satellite"
        ? "hybrid"
        : "standard"
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => {
          if (
            newRegion.latitude !== region.latitude ||
            newRegion.longitude !== region.longitude
          ) {
            setRegion(newRegion);
          }
        }}
        showsUserLocation={!!myCoord}
        showsMyLocationButton={false}
        mapType={mapType}
      >
        <Marker
          coordinate={{ latitude: 52.520008, longitude: 13.404954 }}
          title="Berlin"
        />
      </MapView>

      {/* Loader Overlay */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loaderText}>Standort wird geladen...</Text>
        </View>
      )}

      {/* Back Button */}
      <SafeAreaView style={styles.topControls} edges={["top"]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={HIT_SLOP}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.backText}>Zurück</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* FABs */}
      <View style={styles.fabGroup}>
        <TouchableOpacity
          style={styles.fab}
          onPress={recenter}
          hitSlop={HIT_SLOP}
        >
          <Ionicons name="locate" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={toggleMapType}
          hitSlop={HIT_SLOP}
        >
          <Ionicons name="map" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BTN_BG = "rgba(0,0,0,0.6)";
const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  topControls: { position: "absolute", left: 16, right: 16 },
  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BTN_BG,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  backText: { color: "#fff", marginLeft: 6, fontSize: 16 },
  fabGroup: {
    position: "absolute",
    right: 16,
    bottom: 34,
    gap: 12,
    alignItems: "flex-end",
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BTN_BG,
    alignItems: "center",
    justifyContent: "center",
  },
});
