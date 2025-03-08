// src/components/NotesScreen.js
import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import useNotes from "../hooks/useNotes";
import NoteItem from "../components/NoteItem";
import styles from "../styles/NotesStyles";
import Footer from "../components/Footer";

export default function NotesScreen() {
  const {
    note,
    setNote,
    notes,
    editIndex,
    handleAddNote,
    handleEditNote,
    handleDeleteNote,
  } = useNotes();

  // Memoisiertes renderItem zur Optimierung der FlatList
  const renderItem = useCallback(
    ({ item, index }) => (
      <NoteItem
        note={item}
        index={index}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    ),
    [handleEditNote, handleDeleteNote]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Neue Notiz eingeben..."
        placeholderTextColor="gray"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>
          {editIndex !== null ? "Notiz aktualisieren" : "Notiz hinzufügen"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        windowSize={10}
      />
      <Footer />
    </View>
  );
}
