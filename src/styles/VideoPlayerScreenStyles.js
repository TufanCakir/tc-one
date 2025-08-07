import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = 8;
const NUM_COLUMNS = 3;
const TOTAL_MARGIN = ITEM_MARGIN * (NUM_COLUMNS + 1);
const ITEM_SIZE = (width - TOTAL_MARGIN) / NUM_COLUMNS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: "#ffffff",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  songListContainer: {
    paddingBottom: 180,
    paddingTop: 130,
  },
  albumArt: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  songGradient: {
    width: ITEM_SIZE,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  songText: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
  },
  activeSong: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  activeSongText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
