import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    padding: 10,
  },
  tipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tip: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "30%",
    alignItems: "center",
  },
  tipText: {
    color: "#fff",
    fontSize: 16,
  },
  selected: {
    backgroundColor: "#555",
  },
  customTip: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 20,
  },
  numberOfPeople: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 20,
  },
  generateBillBtn: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  generateBillBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  billOutput: {
    marginTop: 30,
    alignItems: "center",
  },
  tipAmount: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  eachPersonBill: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  value: {
    fontWeight: "bold",
    color: "#0f0",
  },
  resetBtn: {
    padding: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  resetBtnText: {
    color: "#fff",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
