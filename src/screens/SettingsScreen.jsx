// src/screens/SettingsScreen.jsx
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SettingsGrid from "../components/SettingsGrid";
import styles from "../styles/SettingsStyles";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SettingsGrid navigation={navigation} />
      </View>
    </View>
  );
}
