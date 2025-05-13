import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@alarms_list";

const AlarmClock = () => {
  const [alarms, setAlarms] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const timerRef = useRef(null);

  // Load saved alarms on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setAlarms(JSON.parse(stored));
      } catch (e) {
        console.warn("Failed to load alarms", e);
      }
    })();
  }, []);

  // Schedule checks when alarms change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const now = Date.now();
    const dueAlarms = alarms
      .map((a) => ({ ...a, time: new Date(a.time).getTime() }))
      .filter((a) => a.time > now)
      .sort((a, b) => a.time - b.time);

    if (dueAlarms.length > 0) {
      const next = dueAlarms[0];
      const delay = next.time - now;
      timerRef.current = setTimeout(() => triggerAlarm(next), delay);
    }

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [alarms]);

  const triggerAlarm = (alarm) => {
    Alert.alert(
      "Alarm",
      `It is time: ${new Date(alarm.time).toLocaleTimeString()}`
    );
    setAlarms((current) => {
      const updated = current.filter((a) => a.id !== alarm.id);
      saveAlarms(updated);
      return updated;
    });
  };

  const saveAlarms = async (list) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Failed to save alarms", e);
    }
  };

  // Add new alarm and close picker
  const handleAdd = () => {
    const newAlarm = { id: Date.now().toString(), time: selectedDate };
    const updated = [...alarms, newAlarm];
    setAlarms(updated);
    saveAlarms(updated);
    setShowPicker(false);
  };

  const handleDelete = (id) => {
    const updated = alarms.filter((a) => a.id !== id);
    setAlarms(updated);
    saveAlarms(updated);
  };

  // Only update selected date, keep picker open
  const onChange = (event, date) => {
    if (date) setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarm Clock</Text>
      <View style={styles.listContainer}>
        {alarms.length === 0 ? (
          <Text style={styles.placeholder}>No alarms set</Text>
        ) : (
          alarms.map((a) => (
            <View key={a.id} style={styles.alarmItem}>
              <Text style={styles.alarmText}>
                {new Date(a.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <TouchableOpacity onPress={() => handleDelete(a.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <Button
        title={showPicker ? "Choose Time" : "Add Alarm"}
        onPress={() => setShowPicker((prev) => !prev)}
        color="#3498db"
      />

      {showPicker && (
        <>
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
          <Button title="Save Alarm" onPress={handleAdd} color="#27ae60" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#fff",
  },
  listContainer: {
    marginBottom: 24,
  },
  placeholder: {
    textAlign: "center",
    color: "#fff",
  },
  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alarmText: {
    fontSize: 20,
    color: "#000",
  },
  delete: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
});

export default AlarmClock;
