// src/styles/SettingsGridStyles.js

export default {
  screenContainer: {
    flex: 1,
  },
  gridContent: {
    paddingBottom: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android Shadow
  },
  label: {
    marginTop: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
};
