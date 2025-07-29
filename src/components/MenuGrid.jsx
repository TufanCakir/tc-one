import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { menuButtons } from "../data/menuButtons";
import styles from "../styles/MenuGridStyles";

// Icon-Sets importieren
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const iconSets = {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  AntDesign,
  Entypo,
  FontAwesome,
};

const ICON_SIZE = 28;

const MenuGrid = ({ navigation }) => {
  const data = Array.isArray(menuButtons) ? menuButtons : [];
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => {
    const { title = "Kein Titel", screen, icon } = item || {};
    const IconComponent =
      icon?.set && iconSets[icon.set] ? iconSets[icon.set] : null;

    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => screen && navigation.navigate(screen)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={item.accessibilityLabel || title}
        accessibilityHint={item.accessibilityHint}
      >
        {IconComponent && icon?.name && (
          <IconComponent
            name={icon.name}
            size={ICON_SIZE}
            color="#fff"
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
        )}
        <Text style={styles.label}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.gridContainer}>
      <View style={styles.topRightButton}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Öffne Neuigkeiten"
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#fff"
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.screen || item?.title || `menu-${index}`
        }
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        accessibilityViewIsModal={true}
        accessible={true}
      >
        <View style={styles.modalOverlay}>
          <View
            style={styles.modalContent}
            accessible={true}
            accessibilityLabel="Neuigkeiten"
          >
            <Text style={styles.modalTitle}>Neuigkeiten</Text>
            <Text style={styles.modalText}>
              Hier sind die neuesten Funktionen und Updates, die wir hinzugefügt
              haben:
              {"\n"}- Neues Design und Layout
              {"\n"}- Verbesserte Benutzeroberfläche
              {"\n"}- Einige Funktionen wurden entfernt
              {"\n"}- Einige Funktionen wurden hinzugefügt
              {"\n"}- Verbesserte Leistung
              {"\n"}- Neue Icons für die Menüelemente
              {"\n"}- Neue Icons für die Fußzeile
              {"\n"}- Verbesserte Benutzererfahrung
              {"\n"}- Verbesserte Performance
              {"\n"}- Verbesserte Ladezeiten
              {"\n"}- Verbesserte Stabilität
              {"\n"}- Verbesserte Sicherheit
              {"\n"}- Fehlerbehebungen und Leistungsverbesserungen
              {"\n"}- Verbesserte Barrierefreiheit
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Schließe das Neuigkeiten-Fenster"
            >
              <Text style={styles.closeButtonText}>Schließen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuGrid;
