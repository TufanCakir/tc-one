import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";

import MenuGrid from "../components/MenuGrid";
import SettingsScreen from "./SettingsScreen";
import GameScreen from "./GameScreen";
import ProfileScreen from "./ProfileScreen";
import JournalScreen from "./JournalScreen";
import BatteryScreen from "./BatteryScreen";
import Header from "../components/Header";

// LayoutAnimation für Android aktivieren
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TAB_MIN_WIDTH = 90;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const scrollRef = useRef(null);

  // Speichere Layoutdaten jedes Tabs: { x, width }
  const tabLayoutsRef = useRef({});
  const [tabsMeasured, setTabsMeasured] = useState(false);

  const [activePage, setActivePage] = useState(0);

  const tabs = [
    { label: "Home" },
    { label: "games" },
    { label: "Journal" },
    { label: "Profile" },
    { label: "Battery Status" },
    { label: "Settings" },
  ];

  // Zentriert zum Tab anhand onLayout-Daten
  const scrollToTab = useCallback((index) => {
    const layout = tabLayoutsRef.current[index];
    if (!layout || !scrollRef.current) return;

    const { x, width } = layout;
    const target = Math.max(0, x + width / 2 - SCREEN_WIDTH / 2);

    scrollRef.current.scrollTo({ x: target, animated: true });
  }, []);

  const handleTabPress = useCallback(
    (index) => {
      if (index !== activePage) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActivePage(index);
        pagerRef.current?.setPage(index);
        scrollToTab(index);
      }
    },
    [activePage, scrollToTab]
  );

  const handlePageSelected = useCallback(
    (e) => {
      const position = e.nativeEvent.position;
      if (position !== activePage) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActivePage(position);
        scrollToTab(position);
      }
    },
    [activePage, scrollToTab]
  );

  // Nach dem ersten vollständigen Layout einmal zum aktiven Tab scrollen
  useEffect(() => {
    if (tabsMeasured) {
      // Ein Tick warten, bis ScrollView bereit ist
      const t = setTimeout(() => scrollToTab(activePage), 0);
      return () => clearTimeout(t);
    }
  }, [tabsMeasured, activePage, scrollToTab]);

  return (
    <View style={styles.container}>
      <Header />
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
            <View
              key={tab.label || index}
              style={{ minWidth: TAB_MIN_WIDTH }}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                tabLayoutsRef.current[index] = { x, width };
                // Wenn alle gemessen sind, Flag setzen
                if (Object.keys(tabLayoutsRef.current).length === tabs.length) {
                  setTabsMeasured(true);
                }
              }}
            >
              <TouchableOpacity
                style={[styles.tab, activePage === index && styles.activeTab]}
                onPress={() => handleTabPress(index)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Tab ${tab.label}`}
              >
                <Text
                  style={[
                    styles.tabText,
                    activePage === index && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        offscreenPageLimit={1}
        onPageSelected={handlePageSelected}
      >
        <View key="0">
          <MenuGrid navigation={navigation} />
        </View>
        <View key="1">
          <GameScreen navigation={navigation} />
        </View>
        <View key="2">
          <JournalScreen navigation={navigation} />
        </View>
        <View key="3">
          <ProfileScreen navigation={navigation} />
        </View>
        <View key="4">
          <BatteryScreen navigation={navigation} />
        </View>
        <View key="5">
          <SettingsScreen navigation={navigation} />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBarContainer: { paddingVertical: 8 },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    backgroundColor: "#fff",
  },
  tabText: { fontSize: 16, color: "#444" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  pager: { flex: 1 },
});
