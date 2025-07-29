import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import { useState, useRef } from "react";
import MenuGrid from "../components/MenuGrid";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import JournalScreen from "./JournalScreen";
import VideoPlayerScreen from "./VideoPlayerScreen";
import BatteryScreen from "./BatteryScreen";

export default function HomeScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef(null);

  const tabs = [
    "Home",
    "Journal",
    "Profile",
    "Video Player",
    "Battery Status",
    "Settings",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activePage === index && styles.activeTab]}
              onPress={() => pagerRef.current?.setPage(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  activePage === index && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PagerView */}
      <PagerView
        ref={pagerRef}
        offscreenPageLimit={1}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => {
          const position = e.nativeEvent.position;
          setActivePage(position);

          const tabWidth = 120; // Schätzung oder mit onLayout messen
          scrollRef.current?.scrollTo({
            x: Math.max(0, position * tabWidth - tabWidth),
            animated: true,
          });
        }}
      >
        <View key="1">
          <MenuGrid navigation={navigation} />
        </View>
        <View key="2">
          <JournalScreen navigation={navigation} />
        </View>
        <View key="3">
          <ProfileScreen navigation={navigation} />
        </View>
        <View key="4">
          <VideoPlayerScreen navigation={navigation} />
        </View>
        <View key="5">
          <BatteryScreen navigation={navigation} />
        </View>
        <View key="6">
          <SettingsScreen navigation={navigation} />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tabBarContainer: {
    backgroundColor: "#111",
    paddingVertical: 8,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    color: "#aaa",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pager: {
    flex: 1,
  },
});
