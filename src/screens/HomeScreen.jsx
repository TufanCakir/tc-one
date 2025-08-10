import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
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

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_MIN_WIDTH = 90;

// LayoutAnimation für Android aktivieren
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const scrollRef = useRef(null);
  const tabLayoutsRef = useRef({});

  const [tabsMeasured, setTabsMeasured] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const tabs = useMemo(
    () => [
      { label: "Home", component: <MenuGrid navigation={navigation} /> },
      { label: "Games", component: <GameScreen navigation={navigation} /> },
      {
        label: "Journal",
        component: <JournalScreen navigation={navigation} />,
      },
      {
        label: "Profile",
        component: <ProfileScreen navigation={navigation} />,
      },
      {
        label: "Battery Status",
        component: <BatteryScreen navigation={navigation} />,
      },
      {
        label: "Settings",
        component: <SettingsScreen navigation={navigation} />,
      },
    ],
    [navigation]
  );

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

  useLayoutEffect(() => {
    if (tabsMeasured) {
      scrollToTab(activePage);
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
              key={tab.label}
              style={{ minWidth: TAB_MIN_WIDTH }}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                tabLayoutsRef.current[index] = { x, width };
                if (Object.keys(tabLayoutsRef.current).length === tabs.length) {
                  setTabsMeasured(true);
                }
              }}
            >
              <TouchableOpacity
                style={[styles.tab, activePage === index && styles.activeTab]}
                onPress={() => handleTabPress(index)}
                activeOpacity={0.7}
                accessibilityRole="tab"
                accessibilityLabel={`${tab.label} Tab`}
                accessibilityState={{ selected: activePage === index }}
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
        {tabs.map((tab, index) => (
          <View key={index}>{tab.component}</View>
        ))}
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
