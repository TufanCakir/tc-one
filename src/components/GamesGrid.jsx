import { FlatList, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/GameGridStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { gameButtons } from "../data/gameButtons";
import { LinearGradient } from "expo-linear-gradient";

const iconSets = {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
};

export default function GamesGrid({ navigation }) {
  const handlePress = (item) => {
    if (item.screen) return navigation.navigate(item.screen);
  };

  const renderItem = ({ item }) => {
    const IconComponent =
      item.icon?.set && iconSets[item.icon.set]
        ? iconSets[item.icon.set]
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
          data={gameButtons}
          keyExtractor={(item, index) =>
            item?.screen || item?.title || `btn-${index}`
          }
          numColumns={3}
          contentContainerStyle={styles.gridContent}
          renderItem={renderItem}
          accessibilityRole="menu"
          accessibilityLabel="Spiele"
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
