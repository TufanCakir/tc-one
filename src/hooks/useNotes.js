// src/hooks/useNotes.js
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useNotes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Notizen beim ersten Rendern laden
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem("notes");
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Notizen:", error);
      }
    };
    loadNotes();
  }, []);

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Fehler beim Speichern der Notizen:", error);
    }
  };

  // Fügt eine neue Notiz hinzu oder aktualisiert eine bestehende
  const handleAddNote = useCallback(() => {
    if (note.trim() === "") {
      Alert.alert("Hinweis", "Die Notiz darf nicht leer sein!");
      return;
    }

    let updatedNotes;
    if (editIndex !== null) {
      updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setEditIndex(null);
    } else {
      updatedNotes = [...notes, note];
    }
    setNotes(updatedNotes);
    setNote("");
    saveNotes(updatedNotes);
  }, [note, editIndex, notes]);

  // Setzt den TextInput-Inhalt, um eine Notiz zu bearbeiten
  const handleEditNote = useCallback(
    (index) => {
      setNote(notes[index]);
      setEditIndex(index);
    },
    [notes]
  );

  // Löscht eine Notiz mit Bestätigungsabfrage
  const handleDeleteNote = useCallback(
    (index) => {
      Alert.alert("Löschen", "Möchtest du diese Notiz wirklich löschen?", [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => {
            const updatedNotes = notes.filter((_, i) => i !== index);
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
          },
        },
      ]);
    },
    [notes]
  );

  return {
    note,
    setNote,
    notes,
    editIndex,
    handleAddNote,
    handleEditNote,
    handleDeleteNote,
  };
};

export default useNotes;
