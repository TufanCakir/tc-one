import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";

export default function NativeCalendarScreen() {
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [calId, setCalId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [createdEventId, setCreatedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [activeTab, setActiveTab] = useState("Heute");

  const tabs = ["Heute", "Diese Woche", "Diesen Monat", "Alle"];

  const requestPermission = async () => {
    try {
      const { status } = await CalendarAPI.getCalendarPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await CalendarAPI.requestCalendarPermissionsAsync();
        if (newStatus !== "granted") {
          setPermissionDenied(true);
          return false;
        }
      }
      return true;
    } catch (e) {
      Alert.alert("Fehler", "Kalenderzugriff konnte nicht geprüft werden.");
      return false;
    }
  };

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setPermissionDenied(false);

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setLoading(false);
      return;
    }

    try {
      const calendars = await CalendarAPI.getCalendarsAsync(
        CalendarAPI.EntityTypes.EVENT
      );
      const writable = calendars.filter((cal) => cal.allowsModifications);
      if (!writable.length) {
        Alert.alert("Fehler", "Kein schreibbarer Kalender gefunden.");
        return;
      }

      setCalId(writable[0].id);

      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      const end = new Date();
      end.setMonth(end.getMonth() + 1);

      const allEvents = [];
      for (const cal of writable) {
        const evts = await CalendarAPI.getEventsAsync([cal.id], start, end);
        allEvents.push(...evts);
      }

      setEvents(allEvents);

      const marks = {};
      allEvents.forEach((event) => {
        const date = event.startDate.split("T")[0];
        marks[date] = { marked: true, dotColor: "#0f0" };
      });

      const today = new Date().toISOString().split("T")[0];
      if (marks[today]) marks[today].dotColor = "#ff4444";

      setMarkedDates(marks);
    } catch (err) {
      Alert.alert("Fehler", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const createEvent = async () => {
    if (!selectedDate) return Alert.alert("Hinweis", "Bitte Datum auswählen!");
    if (!newTitle.trim()) return Alert.alert("Hinweis", "Titel eingeben!");
    if (!calId) return;

    try {
      setLoading(true);
      const start = new Date(selectedDate);
      start.setHours(12, 0, 0);
      const end = new Date(selectedDate);
      end.setHours(13, 0, 0);

      const eventId = await CalendarAPI.createEventAsync(calId, {
        title: newTitle.trim(),
        startDate: start,
        endDate: end,
        timeZone: "Europe/Berlin",
      });

      setCreatedEventId(eventId);
      setNewTitle("");
      await loadEvents();
      Alert.alert("✅ Erfolg", "Event erstellt!");
    } catch (err) {
      Alert.alert("Fehler beim Erstellen", err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async () => {
    if (!createdEventId)
      return Alert.alert("Hinweis", "Kein Event zum Löschen ausgewählt.");

    try {
      setLoading(true);
      await CalendarAPI.deleteEventAsync(createdEventId);
      setCreatedEventId(null);
      await loadEvents();
      Alert.alert("🗑️ Erfolg", "Event gelöscht!");
    } catch (err) {
      Alert.alert("Fehler beim Löschen", err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    const today = new Date();

    if (activeTab === "Heute") {
      return eventDate.toDateString() === today.toDateString();
    }
    if (activeTab === "Diese Woche") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return eventDate >= weekStart && eventDate <= weekEnd;
    }
    if (activeTab === "Diesen Monat") {
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  const eventsForSelectedDate = selectedDate
    ? events.filter((event) => event.startDate.split("T")[0] === selectedDate)
    : [];

  const handleTabPress = (tab) => {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setActiveTab(tab);

    if (tab === "Heute") {
      const todayStr = new Date().toISOString().split("T")[0];
      setSelectedDate(todayStr);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Dein Kalender</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0f0" style={{ flex: 1 }} />
      ) : permissionDenied ? (
        <Text style={styles.noEvents}>
          ❌ Keine Berechtigung zum Lesen des Kalenders.
        </Text>
      ) : (
        <>
          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabBar}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                onPress={() => handleTabPress(tab)}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.tabButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.tabButtonTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Kalender */}
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              ...markedDates,
              ...(selectedDate && {
                [selectedDate]: { selected: true, selectedColor: "#0f0" },
              }),
            }}
            theme={{
              backgroundColor: "#000",
              calendarBackground: "#000",
              textSectionTitleColor: "#0f0",
              dayTextColor: "#fff",
              monthTextColor: "#0f0",
              arrowColor: "#0f0",
              todayTextColor: "#ff4444",
            }}
          />

          {/* Input + Buttons */}
          <TextInput
            style={styles.input}
            placeholder="Event-Titel eingeben"
            placeholderTextColor="#666"
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.btn, { backgroundColor: "#0f0" }]}
              onPress={createEvent}
            >
              <Ionicons name="add" size={18} color="#000" />
              <Text style={styles.btnText}>Erstellen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.btn, { backgroundColor: "#f33" }]}
              onPress={deleteEvent}
            >
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={[styles.btnText, { color: "#fff" }]}>Löschen</Text>
            </TouchableOpacity>
          </View>

          {/* Eventliste */}
          <ScrollView style={styles.events}>
            {selectedDate ? (
              eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <View key={event.id} style={styles.eventCard}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventTime}>
                      {new Date(event.startDate).toLocaleTimeString()} -{" "}
                      {new Date(event.endDate).toLocaleTimeString()}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noEvents}>Keine Events an diesem Tag.</Text>
              )
            ) : (
              <Text style={styles.noEvents}>Wähle ein Datum aus.</Text>
            )}
          </ScrollView>
        </>
      )}

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 10 },
  header: {
    color: "#0f0",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#111",
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: "#0f0",
  },
  tabButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 15,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  events: { flex: 1 },
  eventCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  eventTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  eventTime: { color: "#aaa", fontSize: 13, marginTop: 4 },
  noEvents: { color: "#888", marginTop: 20, textAlign: "center" },
  footerWrapper: { marginTop: 10 },
});
