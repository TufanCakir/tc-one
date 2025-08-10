import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useProfile } from "../context/ProfileContext";
import Icon from "../components/Icon";

export default function Header() {
  const { profileImage, profileName } = useProfile();

  const displayName = useMemo(
    () => (profileName?.trim() ? profileName : "Gast"),
    [profileName]
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {profileImage ? (
          <Icon id={profileImage} size={32} color="#fff" />
        ) : (
          <Text style={styles.placeholder} accessibilityLabel="Standardprofil">
            🙂
          </Text>
        )}
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {displayName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#111",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  placeholder: {
    fontSize: 22,
    color: "#888",
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
