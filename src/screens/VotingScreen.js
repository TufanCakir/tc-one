import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const options = [
  { id: "excellent", label: "🌟 Excellent" },
  { id: "good", label: "👍 Good" },
  { id: "okay", label: "👌 Okay" },
  { id: "bad", label: "👎 Not great" },
];

const STORAGE_KEY_VOTES = "@app_feedback_votes";
const STORAGE_KEY_VOTED = "@user_voted_feedback";

export default function AppVotingScreen() {
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    try {
      const storedVotes = await AsyncStorage.getItem(STORAGE_KEY_VOTES);
      const votedFlag = await AsyncStorage.getItem(STORAGE_KEY_VOTED);

      if (storedVotes) {
        setVotes(JSON.parse(storedVotes));
      } else {
        const initVotes = {};
        options.forEach((opt) => (initVotes[opt.id] = 0));
        setVotes(initVotes);
      }

      setHasVoted(votedFlag === "true");
    } catch (err) {
      console.log("Failed to load feedback votes", err);
    }
  };

  const castVote = async (id) => {
    if (hasVoted) {
      Alert.alert("Already Voted", "You have already given feedback.");
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
    } catch (err) {
      console.log("Failed to save feedback", err);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>🙏 How do you like this app?</Text>

        {hasVoted && (
          <Text style={styles.thanks}>✅ Thank you for your feedback!</Text>
        )}

        <View style={styles.buttonGrid}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.voteButton}
              onPress={() => castVote(opt.id)}
              disabled={hasVoted}
            >
              <Text style={styles.voteText}>{opt.label}</Text>
              <Text style={styles.voteCount}>Votes: {votes[opt.id] || 0}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  thanks: {
    color: "lightgreen",
    marginBottom: 20,
  },
  buttonGrid: {
    width: "100%",
    alignItems: "center",
  },
  voteButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
  },
  voteText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  voteCount: {
    color: "#888",
    marginTop: 5,
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
