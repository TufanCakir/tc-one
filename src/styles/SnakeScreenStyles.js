// styles/SnakeScreenStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Grid-Setup
const CELL = 18;
const PADDING = 12;
const PLAY_W = Math.min(width, 420) - PADDING * 2;
const COLS = Math.floor(PLAY_W / CELL);
const ROWS = Math.floor((PLAY_W * 1.2) / CELL);
const BOARD_W = COLS * CELL;
const BOARD_H = ROWS * CELL;

export default StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 14,
    paddingHorizontal: PADDING,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  score: { color: "#bbb", fontSize: 16, fontWeight: "600" },

  boardWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: PADDING,
    marginTop: 4,
  },
  board: {
    width: BOARD_W,
    height: BOARD_H,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
  },
  food: { position: "absolute", backgroundColor: "#000", borderRadius: 4 },
  segment: { position: "absolute", borderWidth: 1, borderRadius: 4 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  overlayText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 1,
  },

  controls: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: PADDING,
    paddingVertical: 14,
    justifyContent: "center",
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
  },
  btnActive: { backgroundColor: "#eee" },
  btnText: { color: "#000", fontWeight: "700", letterSpacing: 0.5 },

  btnPrimary: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  btnPrimaryText: { color: "#000", fontWeight: "800", fontSize: 16 },

  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
