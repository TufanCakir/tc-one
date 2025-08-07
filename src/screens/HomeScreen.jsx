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
import { LinearGradient } from "expo-linear-gradient";

import MenuGrid from "../components/MenuGrid";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import JournalScreen from "./JournalScreen";
import VideoPlayerScreen from "./VideoPlayerScreen";
import BatteryScreen from "./BatteryScreen";
import ProfielHeader from "../components/ProfileHeader";

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
      <ProfielHeader />
      <LinearGradient
        colors={["#000000", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tabBarContainer}
      >
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
      </LinearGradient>

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
  },
  tabBarContainer: {
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
    color: "#444",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  pager: {
    flex: 1,
  },
});
