// Unified Icon Set Constants
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
    accessibilityLabel: "Open YouTube channel",
    accessibilityHint: "Opens the official YouTube channel in the browser",
  },
  {
    title: "Instagram",
    screen: null,
    url: "https://www.instagram.com/tufancakirorigins/",
    icon: { set: ICONS.feather, name: "instagram" },
    accessibilityLabel: "Open Instagram profile",
    accessibilityHint: "Opens the Instagram profile in the browser",
  },
  {
    title: "LinkedIn",
    screen: null,
    url: "https://www.linkedin.com/in/tufan-cakir-b03842358/",
    icon: { set: ICONS.feather, name: "linkedin" },
    accessibilityLabel: "Open LinkedIn profile",
    accessibilityHint: "Opens the LinkedIn profile in the browser",
  },

  // --- Game & Dev Pages ---
  {
    title: "itch.io",
    screen: null,
    url: "https://tufan-cakir.itch.io/",
    icon: { set: ICONS.mci, name: "controller-classic" },
    accessibilityLabel: "Open itch.io page",
    accessibilityHint: "Opens the itch.io page with games in the browser",
  },

  // --- Website ---
  {
    title: "Website",
    screen: null,
    url: "https://www.tufancakir.com/",
    icon: { set: ICONS.feather, name: "globe" },
    accessibilityLabel: "Open website",
    accessibilityHint: "Opens the personal website in the browser",
  },

  // --- App Internal ---
  {
    title: "Terms of Service",
    screen: "TermsOfServiceScreen",
    url: null,
    icon: { set: ICONS.feather, name: "file-text" },
    accessibilityLabel: "View Terms of Service",
    accessibilityHint: "Shows the current Terms of Service inside the app",
  },

  // --- Account Management ---
  {
    title: "Account Reset",
    screen: null,
    url: null,
    icon: { set: ICONS.mci, name: "backup-restore" },
    isReset: true,
    accessibilityLabel: "Reset account",
    accessibilityHint:
      "Resets the account. Warning: All saved data will be deleted.",
  },
];
