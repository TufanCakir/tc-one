import {
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  View,
} from "react-native";
import styles from "../styles/SettingsGridStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { settingsButtons } from "../data/settingsButtons";
import { LinearGradient } from "expo-linear-gradient";

const iconSets = {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
};

export default function SettingsGrid({ navigation, onClose, onResetAccount }) {
  const handlePress = (item) => {
    if (item.isReset) return onResetAccount?.();
    if (item.isClose) return onClose?.();
    if (item.screen) return navigation.navigate(item.screen);
    if (item.url) return Linking.openURL(item.url);
  };

  const renderItem = ({ item }) => {
    const IconComponent =
      item.icon?.set && iconSets[item.icon.set]
        ? iconSets[item.icon.set]
        : null;

    return (
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => handlePress(item)}
        accessibilityRole="button"
        accessibilityLabel={item.accessibilityLabel || item.title}
        accessibilityHint={item.accessibilityHint}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={["#000000", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          {IconComponent && item.icon?.name && (
            <IconComponent
              name={item.icon.name}
              size={28}
              color="#fff"
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
          )}

          <Text style={styles.label}>{item.title}</Text>
          {item.url && (
            <Feather
              name="external-link"
              size={14}
              color="#fff"
              style={{ marginLeft: 4 }}
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#000000", "#ffffff"]}
      style={styles.gridContainer}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={settingsButtons}
          keyExtractor={(item, index) =>
            item?.screen || item?.title || `btn-${index}`
          }
          numColumns={3}
          contentContainerStyle={styles.gridContent}
          renderItem={renderItem}
          accessibilityRole="menu"
          accessibilityLabel="Einstellungen"
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
