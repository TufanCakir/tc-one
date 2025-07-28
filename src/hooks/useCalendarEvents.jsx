// src/hooks/useCalendarEvents.js
import { useState } from "react";
import { Alert } from "react-native";

const useCalendarEvents = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState({});

  // Beim Tippen auf ein Datum wird dieses markiert
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // Fügt ein Event zum ausgewählten Datum hinzu
  const addEvent = () => {
    if (!selectedDate) {
      Alert.alert(
        "Kein Datum ausgewählt",
        "Bitte wähle ein Datum im Kalender aus."
      );
      return;
    }
    if (!eventTitle.trim()) {
      Alert.alert("Eingabe erforderlich", "Bitte gib einen Event-Titel ein.");
      return;
    }
    setEvents((prevEvents) => {
      const dayEvents = prevEvents[selectedDate]
        ? [...prevEvents[selectedDate]]
        : [];
      return {
        ...prevEvents,
        [selectedDate]: [...dayEvents, { title: eventTitle }],
      };
    });
    setEventTitle("");
  };

  // Markierungen für den Kalender
  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "blue" },
  };

  return {
    selectedDate,
    eventTitle,
    setEventTitle,
    events,
    handleDayPress,
    addEvent,
    markedDates,
  };
};

export default useCalendarEvents;
