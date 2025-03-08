// src/components/MyCalendarScreen.js
import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import useCalendarEvents from "../hooks/useCalendarEvents";
import styles from "../styles/CalendarStyles";
import Footer from "../components/Footer";

export default function MyCalendarScreen() {
  const {
    selectedDate,
    eventTitle,
    setEventTitle,
    events,
    handleDayPress,
    addEvent,
    markedDates,
  } = useCalendarEvents();

  return (
    <View style={[styles.container]}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: "transparent",
          textSectionTitleColor: "white",
          dayTextColor: "white",
          monthTextColor: "white",
          arrowColor: "white",
          selectedDayBackgroundColor: "blue",
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event-Titel"
          placeholderTextColor="#aaa"
          value={eventTitle}
          onChangeText={setEventTitle}
        />
        <Button title="Event hinzufügen" onPress={addEvent} color="white" />
      </View>

      <View style={styles.eventsContainer}>
        <Text style={styles.subtitle}>
          Events am {selectedDate || "ausgewähltem Datum"}:
        </Text>
        {events[selectedDate] && events[selectedDate].length > 0 ? (
          events[selectedDate].map((ev, idx) => (
            <Text key={idx} style={styles.eventText}>
              - {ev.title}
            </Text>
          ))
        ) : (
          <Text style={styles.eventText}>Keine Events gefunden.</Text>
        )}
      </View>
      <Footer />
    </View>
  );
}
