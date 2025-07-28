// // src/components/TaskItem.js
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/TodoStyles";

export default function TaskItem({
  item,
  index,
  onToggleDone,
  onEdit,
  onDelete,
}) {
  return (
    <View style={[styles.task, styles[item.priority]]}>
      <TouchableOpacity onPress={() => onToggleDone(index)}>
        <Text style={[styles.itemList, item.done && styles.doneText]}>
          {item.done ? "✔️ " : "⬜️ "} {item.text} (
          {(item.priority || "mittel").toUpperCase()})
        </Text>
      </TouchableOpacity>
      <Text style={styles.dueDate}>{item.dueDate}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => onEdit(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
