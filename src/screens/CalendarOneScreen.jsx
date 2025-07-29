import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";

export default function CalendarOneScreen() {
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [calId, setCalId] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [createdEventId, setCreatedEventId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert("Fehler", "Keine Kalender-Berechtigung");
      }

      const calendars = await CalendarAPI.getCalendarsAsync(
        CalendarAPI.EntityTypes.EVENT
      );

      const writable = calendars.filter((cal) => cal.allowsModifications);
      if (writable.length === 0) {
        return Alert.alert("Fehler", "Kein schreibbarer Kalender gefunden");
      }

      setCalId(writable[0].id);

      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      const end = new Date();
      end.setMonth(end.getMonth() + 1);

      let allEvents = [];
      for (const cal of writable) {
        const evts = await CalendarAPI.getEventsAsync([cal.id], start, end);
        allEvents = [...allEvents, ...evts];
      }

      setEvents(allEvents);

      const marks = {};
      allEvents.forEach((event) => {
        const date = event.startDate.split("T")[0];
        marks[date] = {
          marked: true,
          dotColor: "red",
        };
      });

      setMarkedDates(marks);
    } catch (err) {
      console.error(err);
      Alert.alert("Fehler", err.message);
    }
  };

  const createEvent = async () => {
    if (!selectedDate) return Alert.alert("Hinweis", "Bitte wähle ein Datum!");
    if (!newTitle.trim()) return Alert.alert("Hinweis", "Titel eingeben!");

    try {
      const start = new Date(selectedDate);
      start.setHours(12, 0, 0);
      const end = new Date(selectedDate);
      end.setHours(13, 0, 0);

      const eventId = await CalendarAPI.createEventAsync(calId, {
        title: newTitle,
        startDate: start,
        endDate: end,
        timeZone: "Europe/Berlin",
      });

      setCreatedEventId(eventId);
      Alert.alert("Erfolg", "Event erstellt!");
      setNewTitle("");
      loadEvents();
    } catch (err) {
      Alert.alert("Fehler beim Erstellen", err.message);
    }
  };

  const deleteEvent = async () => {
    if (!createdEventId)
      return Alert.alert("Hinweis", "Kein Event zum Löschen!");
    try {
      await CalendarAPI.deleteEventAsync(createdEventId);
      Alert.alert("Erfolg", "Event gelöscht!");
      setCreatedEventId(null);
      loadEvents();
    } catch (err) {
      Alert.alert("Fehler beim Löschen", err.message);
    }
  };

  const eventsForSelectedDate = events.filter(
    (event) => event.startDate.split("T")[0] === selectedDate
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Dein Kalender</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          ...(selectedDate
            ? { [selectedDate]: { selected: true, selectedColor: "#0f0" } }
            : {}),
        }}
        theme={{
          backgroundColor: "#111",
          calendarBackground: "#111",
          textSectionTitleColor: "#0f0",
          dayTextColor: "#fff",
          monthTextColor: "#0f0",
          arrowColor: "#0f0",
          todayTextColor: "red",
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Event-Titel eingeben"
        placeholderTextColor="#666"
        value={newTitle}
        onChangeText={setNewTitle}
      />

      <View style={styles.buttonRow}>
        <Button title="➕ Event erstellen" onPress={createEvent} />
        <Button title="❌ Letztes löschen" onPress={deleteEvent} color="red" />
      </View>

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
          <Text style={styles.noEvents}>👉 Wähle ein Datum aus.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 10 },
  header: { color: "#0f0", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  events: { marginTop: 10 },
  eventCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  eventTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  eventTime: { color: "#aaa", fontSize: 13, marginTop: 4 },
  noEvents: { color: "#888", marginTop: 20, textAlign: "center" },
});
