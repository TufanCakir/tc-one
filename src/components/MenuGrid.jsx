import { useState, useCallback, useMemo } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
import { MaterialIcons } from "@expo/vector-icons";

// Konstanten
const ICON_SETS = {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
};
const ICON_SIZE = 28;

export default function MenuGrid({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const data = useMemo(
    () => (Array.isArray(menuButtons) ? menuButtons : []),
    []
  );

  const handleOpenModal = useCallback(() => setModalVisible(true), []);
  const handleCloseModal = useCallback(() => setModalVisible(false), []);

  const renderItem = useCallback(
    ({ item }) => {
      const { title = "Kein Titel", screen, icon } = item || {};
      const IconComponent =
        icon?.set && ICON_SETS[icon.set] ? ICON_SETS[icon.set] : null;

      return (
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => screen && navigation.navigate(screen)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={item?.accessibilityLabel || title}
          accessibilityHint={item?.accessibilityHint}
        >
          <LinearGradient
            colors={["#000000", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            {IconComponent && icon?.name && (
              <IconComponent
                name={icon.name}
                size={ICON_SIZE}
                color="#fff"
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            )}
            <Text style={styles.label} numberOfLines={1}>
              {title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    },
    [navigation]
  );

  return (
    <View style={styles.gridContainer}>
      {/* Top-Rechts Button */}
      <View style={styles.topRightButton}>
        <TouchableOpacity
          onPress={handleOpenModal}
          accessibilityRole="button"
          accessibilityLabel="Öffne Neuigkeiten"
        >
          <Ionicons
            name="information-circle-outline"
            size={26}
            color="#fff"
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.screen || item?.title || `menu-${index}`
        }
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 8 }}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={handleCloseModal}
        accessibilityViewIsModal
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Neuigkeiten</Text>
            <Text style={styles.modalText}>
              Hier sind die neuesten Funktionen und Updates:
              {"\n"}• Neues Design und Layout
              {"\n"}• Verbesserte Performance
              {"\n"}• Bugfixes
            </Text>
            <Pressable
              onPress={handleCloseModal}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Schließe Neuigkeiten"
            >
              <Text style={styles.closeButtonText}>Schließen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
