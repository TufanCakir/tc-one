import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button } from "react-native";

export default function VideoPlayer({
  source,
  autoplay = true,
  loop = true,
  width = 350,
  height = 275,
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
      <View style={styles.controls}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            isPlaying ? player.pause() : player.play();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    borderRadius: 12,
    backgroundColor: "#000",
  },
  controls: {
    marginTop: 12,
  },
});
