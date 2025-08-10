import { useCallback, useMemo } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import styles from "../styles/GameGridStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { gameButtons } from "../data/gameButtons";
import { LinearGradient } from "expo-linear-gradient";

const ICON_SETS = {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
};

const ICON_SIZE = 28;

export default function GamesGrid({ navigation }) {
  const data = useMemo(
    () => (Array.isArray(gameButtons) ? gameButtons : []),
    []
  );

  const handlePress = useCallback(
    (item) => {
      if (item.screen) navigation.navigate(item.screen);
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const IconComponent =
        item.icon?.set && ICON_SETS[item.icon.set]
          ? ICON_SETS[item.icon.set]
          : null;

      return (
        <TouchableOpacity
          style={styles.gamesItem}
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
                size={ICON_SIZE}
                color="#fff"
                accessibilityElementsHidden
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
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      );
    },
    [handlePress]
  );

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.screen || item?.title || `btn-${index}`
        }
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        accessibilityRole="menu"
        accessibilityLabel="Spiele"
      />
    </View>
  );
}
