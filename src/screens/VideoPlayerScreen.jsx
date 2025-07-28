import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import styles from "../styles/VideoPlayerScreenStyles";
import VideoPlayer from "../components/VideoPlayer";
import songsData from "../data/songs.json";

export default function VideoPlayerScreen() {
  const navigation = useNavigation();
  const [currentSong, setCurrentSong] = useState(songsData.songs[0]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={localStyles.title}>{currentSong.title}</Text>
        <VideoPlayer
          source={currentSong.url}
          autoplay={true}
          loop={false}
          width={400}
          height={300}
        />
        <FlatList
          data={songsData.songs}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                localStyles.songItem,
                item.url === currentSong.url && localStyles.activeSong,
              ]}
              onPress={() => setCurrentSong(item)}
            >
              <Text
                style={[
                  localStyles.songText,
                  item.url === currentSong.url && localStyles.activeSongText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Footer />
    </View>
  );
}

const localStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
  songItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  activeSong: {
    backgroundColor: "#555",
  },
  songText: {
    fontSize: 16,
    color: "#ccc",
  },
  activeSongText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
