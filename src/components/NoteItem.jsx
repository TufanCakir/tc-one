// src/components/NoteItem.js
import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/NotesStyles";

const NoteItem = memo(({ note, index, onEdit, onDelete }) => (
  <View style={styles.note}>
    <Text style={styles.noteText}>{note}</Text>
    <View style={styles.noteButtons}>
      <TouchableOpacity onPress={() => onEdit(index)}>
        <Text style={styles.editButton}>Bearbeiten</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(index)}>
        <Text style={styles.deleteButton}>Löschen</Text>
      </TouchableOpacity>
    </View>
  </View>
));

export default NoteItem;
