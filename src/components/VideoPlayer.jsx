import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export default function VideoPlayer({
  source,
  autoplay = true,
  loop = true,
  width = 300,
  height = 300,
}) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = loop;
    if (autoplay) player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={[styles.video, { width, height }]}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      <TouchableOpacity
        onPress={() => (isPlaying ? player.pause() : player.play())}
        activeOpacity={0.9}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    borderRadius: 12,
    backgroundColor: "#000",
  },
});
