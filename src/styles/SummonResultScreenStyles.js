import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  listContent: {
    flexGrow: 1,
    width: "100%",
  },
  backButton: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
