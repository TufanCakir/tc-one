import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff", // Auf dunklem Hintergrund lesbar
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#fff",
  },
  copyrightText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});
