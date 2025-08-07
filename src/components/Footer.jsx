import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/FooterStyles";
import { LinearGradient } from "expo-linear-gradient";

const Footer = () => {
  const navigation = useNavigation();

  const buttons = [
    {
      iconSet: Ionicons,
      iconName: "home-outline",
      label: "Home",
      screen: "HomeScreen",
    },
  ];

  return (
    <LinearGradient
      colors={["#000000", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.footer} // deine Footer-Größe, z. B. height: 60
    >
      <View style={styles.iconRow}>
        {buttons.map((btn, index) => {
          const Icon = btn.iconSet;
          return (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => navigation.navigate(btn.screen)}
            >
              <Icon name={btn.iconName} size={22} color="#fff" />
              <Text style={styles.iconText}>{btn.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default Footer;
