import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/VideoPlayerScreenStyles";
import VideoPlayer from "../components/VideoPlayer";
import songsData from "../data/songs.json";
import { Image } from "expo-image";

export default function VideoPlayerScreen() {
  const navigation = useNavigation();
  const [currentSong, setCurrentSong] = useState(songsData.songs[0]);

  const renderSongItem = ({ item }) => {
    const isActive = item.url === currentSong.url;

    return (
      <TouchableOpacity
        style={[styles.songItem, isActive && styles.activeSong]}
        onPress={() => setCurrentSong(item)}
      >
        <Image
          source={item.image}
          style={styles.albumArt}
          contentFit="cover" // expo-image ersetzt resizeMode durch contentFit
          transition={300} // optionales weiches Einblenden
        />
        <View style={styles.songGradient}>
          <Text
            style={[styles.songText, isActive && styles.activeSongText]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{currentSong.title}</Text>

        <VideoPlayer
          source={currentSong.url}
          autoplay
          loop={false}
          width={400}
          height={200}
        />

        <FlatList
          data={songsData.songs}
          keyExtractor={(item) => item.url}
          numColumns={3}
          renderItem={renderSongItem}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.songListContainer}
        />
      </View>
    </View>
  );
}
