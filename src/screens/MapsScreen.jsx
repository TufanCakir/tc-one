import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    (async () => {
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
        const { latitude, longitude } = loc.coords;

        const userLocation = { latitude, longitude };
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
    })();
  }, []);

  const recenter = () => {
    if (!myCoord) return;
    mapRef.current?.animateToRegion(
      { ...myCoord, latitudeDelta: 0.05, longitudeDelta: 0.05 },
      600
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Standort wird geladen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={!!myCoord}
        showsMyLocationButton={false}
        mapType={mapType}
      >
        <Marker
          coordinate={{ latitude: 52.520008, longitude: 13.404954 }}
          title="Berlin"
        />
      </MapView>

      <SafeAreaView style={styles.topControls} edges={["top"]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.fabGroup}>
        <TouchableOpacity style={styles.fab} onPress={recenter}>
          <Ionicons name="locate" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            setMapType((t) =>
              t === "standard"
                ? "satellite"
                : t === "satellite"
                ? "hybrid"
                : "standard"
            )
          }
        >
          <Ionicons name="map" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BTN_BG = "rgba(0,0,0,0.6)";

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BTN_BG,
    alignItems: "center",
    justifyContent: "center",
  },
});
