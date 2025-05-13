import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import AlarmClock from "../components/AlarmClock";
import styles from "../styles/HomeScreenStyles";

export default function AlarmClockScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AlarmClock navigation={navigation} />
      </View>
      <Footer />
    </View>
  );
}
