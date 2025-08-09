import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import styles from "../styles/StartScreenStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function StartScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace("HomeScreen");
  };

  const version = Constants.expoConfig?.version ?? "1.0.0";
  const buildNumber =
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode ??
    "1";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to TC One</Text>

        <TouchableOpacity onPress={handleStart} activeOpacity={0.8}>
          <LinearGradient
            colors={["#000000", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>
          Version {version}
          {buildNumber !== "1" ? ` (Build ${buildNumber})` : ""}
        </Text>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Tufan Cakir
        </Text>
      </View>
    </View>
  );
}
