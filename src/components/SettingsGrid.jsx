import {
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Linking,
} from "react-native";
import styles from "../styles/SettingsGridStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { settingsButtons } from "../data/settingsButtons";

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
        style={styles.button}
        onPress={() => handlePress(item)}
        accessibilityRole="button"
        accessibilityLabel={item.accessibilityLabel || item.title}
        accessibilityHint={item.accessibilityHint}
      >
        <View style={{ alignItems: "center" }}>
          {IconComponent && item.icon?.name && (
            <IconComponent
              name={item.icon.name}
              size={28}
              color="white"
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
          )}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <Text style={styles.label}>{item.title}</Text>
            {item.url && (
              <Feather
                name="external-link"
                size={14}
                color="white"
                style={{ marginLeft: 4 }}
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer} accessible={false}>
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
  );
}
