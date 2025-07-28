import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import MenuGrid from "../components/MenuGrid";
import styles from "../styles/HomeScreenStyles";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MenuGrid navigation={navigation} />
      </View>
      <Footer />
    </View>
  );
}
