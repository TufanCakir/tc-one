import React, {
  useState,
  useRef,
  useCallback,
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
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const tabLayoutsRef = useRef({});
  const animatedScrollX = useRef(new Animated.Value(0)).current;

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
        scrollToTab(index);

        Animated.timing(animatedScrollX, {
          toValue: SCREEN_WIDTH * index,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start();
      }
    },
    [activePage, scrollToTab, animatedScrollX]
  );

  const handleContentScrollEnd = useCallback(
    (event) => {
      const pageIndex = Math.round(
        event.nativeEvent.contentOffset.x / SCREEN_WIDTH
      );
      if (pageIndex !== activePage) {
        setActivePage(pageIndex);
        scrollToTab(pageIndex);
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
                activeOpacity={0.8}
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

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleContentScrollEnd}
        scrollEventThrottle={16}
        contentOffset={{ x: activePage * SCREEN_WIDTH, y: 0 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedScrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {tabs.map((tab, index) => {
          // Lazy Loading: nur aktiver + Nachbarn
          if (Math.abs(activePage - index) > 1) {
            return <View key={index} style={{ width: SCREEN_WIDTH }} />;
          }
          return (
            <View key={index} style={{ width: SCREEN_WIDTH }}>
              {tab.component}
            </View>
          );
        })}
      </Animated.ScrollView>
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
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: { fontSize: 16, color: "#e6e6e6" },
  activeTabText: { color: "#000", fontWeight: "600" },
});
