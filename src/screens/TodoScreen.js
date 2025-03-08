import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../styles/TodoStyles";
import TaskItem from "../components/TaskItem";
import { loadTasks, saveTasks } from "../utils/storage";
import isValidDate from "../utils/dateValidator";
import Footer from "../components/Footer";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("mittel");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Aufgaben beim ersten Rendern laden
  useEffect(() => {
    async function fetchTasks() {
      const saved = await loadTasks();
      if (saved) {
        setTasks(saved);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = useCallback(() => {
    if (task.trim() === "") {
      Alert.alert("Hinweis", "Die Aufgabe darf nicht leer sein!");
      return;
    }
    if (!isValidDate(dueDate)) {
      Alert.alert(
        "Fehler",
        "Bitte ein gültiges Datum im Format TT.MM.JJJJ eingeben."
      );
      return;
    }
    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: task, done: false, priority, dueDate };
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, { text: task, done: false, priority, dueDate }];
    }
    setTasks(updatedTasks);
    setTask("");
    setPriority("mittel");
    setDueDate("");
    saveTasks(updatedTasks);
  }, [task, dueDate, priority, editIndex, tasks]);

  const handleToggleDone = useCallback(
    (index) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].done = !updatedTasks[index].done;
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    },
    [tasks]
  );

  const handleEditTask = useCallback(
    (index) => {
      setTask(tasks[index].text);
      setPriority(tasks[index].priority);
      setDueDate(tasks[index].dueDate);
      setEditIndex(index);
    },
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (index) => {
      Alert.alert("Löschen", "Möchtest du diese Aufgabe wirklich löschen?", [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          onPress: () => {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]);
    },
    [tasks]
  );

  // Sortiert Aufgaben nach Priorität (hoch > mittel > niedrig)
  const sortedTasks = useMemo(() => {
    const priorityOrder = { hoch: 3, mittel: 2, niedrig: 1 };
    return [...tasks].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }, [tasks]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TaskItem
        item={item}
        index={index}
        onToggleDone={handleToggleDone}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleDone, handleEditTask, handleDeleteTask]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Aufgabe eingeben"
          placeholderTextColor="gray"
          value={task}
          onChangeText={setTask}
        />
        <TextInput
          style={styles.input}
          placeholder="Fälligkeitsdatum (TT.MM.JJJJ)"
          placeholderTextColor="gray"
          value={dueDate}
          onChangeText={(text) => setDueDate(text.replace(/,/g, "."))}
          keyboardType="numeric"
        />
        <View style={styles.priorityButtons}>
          <TouchableOpacity onPress={() => setPriority("hoch")}>
            <Text
              style={[
                styles.priority,
                priority === "hoch" && styles.activePriority,
              ]}
            >
              🔴 Hoch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPriority("mittel")}>
            <Text
              style={[
                styles.priority,
                priority === "mittel" && styles.activePriority,
              ]}
            >
              🟡 Mittel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPriority("niedrig")}>
            <Text
              style={[
                styles.priority,
                priority === "niedrig" && styles.activePriority,
              ]}
            >
              🔵 Niedrig
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editIndex !== null
              ? "Aufgabe aktualisieren"
              : "Aufgabe hinzufügen"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={sortedTasks}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
        <Footer />
      </View>
    </TouchableWithoutFeedback>
  );
}
