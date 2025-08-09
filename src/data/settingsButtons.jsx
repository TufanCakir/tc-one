// Einheitliche Icon-Set-Konstanten
const ICONS = {
  feather: "Feather",
  mci: "MaterialCommunityIcons",
};

export const settingsButtons = [
  // --- Social Media ---
  {
    title: "YouTube",
    screen: null,
    url: "https://youtube.com/@tufancakirorigins?si=xiiB9MuGv6YCEc9W",
    icon: { set: ICONS.feather, name: "youtube" },
    accessibilityLabel: "YouTube-Kanal öffnen",
    accessibilityHint: "Öffnet den offiziellen YouTube-Kanal im Browser",
  },
  {
    title: "Instagram",
    screen: null,
    url: "https://www.instagram.com/tufancakirorigins/",
    icon: { set: ICONS.feather, name: "instagram" },
    accessibilityLabel: "Instagram-Profil öffnen",
    accessibilityHint: "Öffnet das Instagram-Profil im Browser",
  },
  {
    title: "LinkedIn",
    screen: null,
    url: "https://www.linkedin.com/in/tufan-cakir-b03842358/",
    icon: { set: ICONS.feather, name: "linkedin" },
    accessibilityLabel: "LinkedIn-Profil öffnen",
    accessibilityHint: "Öffnet das LinkedIn-Profil im Browser",
  },

  // --- Game & Dev Pages ---
  {
    title: "itch.io",
    screen: null,
    url: "https://tufan-cakir.itch.io/",
    icon: { set: ICONS.mci, name: "controller-classic" },
    accessibilityLabel: "itch.io-Seite öffnen",
    accessibilityHint: "Öffnet die itch.io-Seite mit den Spielen im Browser",
  },

  // --- Website ---
  {
    title: "Website",
    screen: null,
    url: "https://www.tufancakir.com/",
    icon: { set: ICONS.feather, name: "globe" },
    accessibilityLabel: "Website öffnen",
    accessibilityHint: "Öffnet die persönliche Website im Browser",
  },

  // --- App Internal ---
  {
    title: "Terms of Service",
    screen: "TermsOfServiceScreen",
    url: null,
    icon: { set: ICONS.feather, name: "file-text" },
    accessibilityLabel: "Nutzungsbedingungen anzeigen",
    accessibilityHint: "Zeigt die aktuellen Nutzungsbedingungen in der App",
  },

  // --- Account Management ---
  {
    title: "Account Reset",
    screen: null,
    url: null,
    icon: { set: ICONS.mci, name: "backup-restore" },
    isReset: true,
    accessibilityLabel: "Account zurücksetzen",
    accessibilityHint:
      "Setzt den Account zurück. Achtung: Alle gespeicherten Daten werden gelöscht.",
  },
];
