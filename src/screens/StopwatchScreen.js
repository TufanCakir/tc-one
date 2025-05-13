import { View, Text, TouchableOpacity } from "react-native";
import useStopwatch from "../hooks/useStopwatch";
import styles from "../styles/StopwatchStyles";
import Footer from "../components/Footer";

const StopwatchScreen = () => {
  const {
    time,
    running,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    resumeStopwatch,
  } = useStopwatch();

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}s</Text>
      <View style={styles.buttonContainer}>
        {running ? (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseStopwatch}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startStopwatch}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
        {!running && (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={resumeStopwatch}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
};

export default StopwatchScreen;
