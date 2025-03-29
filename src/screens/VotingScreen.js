import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backgrounds from "../data/backgrounds.json";
import Footer from "../components/Footer";

const STORAGE_KEY_VOTES = "@background_votes";
const STORAGE_KEY_VOTED = "@user_has_voted";

const VotingScreen = () => {
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    try {
      const storedVotes = await AsyncStorage.getItem(STORAGE_KEY_VOTES);
      const storedVoteFlag = await AsyncStorage.getItem(STORAGE_KEY_VOTED);

      if (storedVotes) setVotes(JSON.parse(storedVotes));
      else {
        const initVotes = {};
        backgrounds.forEach((bg) => {
          initVotes[bg.id] = 0;
        });
        setVotes(initVotes);
      }

      setHasVoted(storedVoteFlag === "true");
    } catch (error) {
      console.log("Error loading votes", error);
    }
  };

  const castVote = async (id) => {
    if (hasVoted) {
      Alert.alert("Already Voted", "You have already voted for a background.");
      return;
    }

    const updatedVotes = {
      ...votes,
      [id]: (votes[id] || 0) + 1,
    };

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_VOTES,
        JSON.stringify(updatedVotes)
      );
      await AsyncStorage.setItem(STORAGE_KEY_VOTED, "true");
      setVotes(updatedVotes);
      setHasVoted(true);
    } catch (error) {
      console.log("Error saving vote", error);
    }
  };

  const getTop3 = () => {
    return Object.entries(votes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => backgrounds.find((bg) => bg.id === id));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>
            🎨 Vote for your favorite background gradient
          </Text>

          {hasVoted && (
            <Text style={{ color: "green", marginBottom: 10 }}>
              ✅ Thank you! You already voted.
            </Text>
          )}

          <View style={styles.grid}>
            {backgrounds.map((bg) => (
              <View key={bg.id} style={styles.gradientContainer}>
                <LinearGradient colors={bg.colors} style={styles.gradient}>
                  <Text style={styles.gradientTitle}>{bg.name}</Text>
                </LinearGradient>
                <Button
                  title={`Vote for ${bg.name}`}
                  onPress={() => castVote(bg.id)}
                />
                <View style={styles.voteContainer}>
                  <Text style={styles.voteText}>
                    Votes: {votes[bg.id] || 0}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.topTitle}>🏆 Top 3 Backgrounds</Text>
          {getTop3().map((bg, index) => (
            <Text key={bg?.id || index} style={styles.topItem}>
              {index + 1}. {bg?.name} ({votes[bg?.id] || 0} votes)
            </Text>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#fff",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gradientContainer: {
    margin: 10,
    alignItems: "center",
  },
  gradient: {
    width: Dimensions.get("window").width / 2.2,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  voteContainer: {
    backgroundColor: "#000",
    padding: 6,
    borderRadius: 5,
    marginTop: 8,
  },
  voteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#fff",
  },
  topItem: {
    fontSize: 16,
    color: "#fff",
  },
  footerWrapper: {
    backgroundColor: "#1e1e1e",
  },
});

export default VotingScreen;
