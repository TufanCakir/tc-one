// src/navigation/screens.jsx

// Hilfsfunktion: "MyCoolScreen" → "My Cool"
const toReadableTitle = (name = "") =>
  name
    .replace("Screen", "")
    .replace(/([A-Z])/g, " $1")
    .trim() || "Screen";

// Screens-Imports
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import CalendarScreen from "../screens/CalendarScreen";
import EmojiPickerScreen from "../screens/EmojiPickerScreen";
import NotesScreen from "../screens/NotesScreen";
import PasswordGeneratorScreen from "../screens/PasswordGeneratorScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import TodoScreen from "../screens/TodoScreen";
import StopwatchScreen from "../screens/StopwatchScreen";
import OTPGeneratorValidatorScreen from "../screens/OTPGeneratorValidatorScreen";
import SettingsScreen from "../screens/SettingsScreen";
import QRCodeGeneratorScreen from "../screens/QRCodeGeneratorScreen";
import VotingScreen from "../screens/VotingScreen";
import BmiCalculatorScreen from "../screens/BmiCalculatorScreen";
import BillSplitterScreen from "../screens/BillSplitterScreen";
import BlogScreen from "../screens/BlogScreen";
import TextEditorScreen from "../screens/TextEditorScreen";
import CompassScreen from "../screens/CompassScreen";
import AlarmClockScreen from "../screens/AlarmClockScreen";
import TypingSpeedMonitorScreen from "../screens/TypingSpeedMonitorScreen";
import JournalScreen from "../screens/JournalScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapsScreen from "../screens/MapsScreen";
import NativeCalendarScreen from "../screens/NativeCalendarScreen";
import BatteryScreen from "../screens/BatteryScreen";
import PrintScreen from "../screens/PrintScreen";
import SupportScreen from "../screens/SupportScreen";

// Game Screens
import SnakeScreen from "../gameScreens/SnakeScreen";

// Rohdefinition
const rawScreens = [
  { name: "StartScreen", component: StartScreen, title: "Start" },
  { name: "HomeScreen", component: HomeScreen, title: "Home" },
  { name: "AlarmClockScreen", component: AlarmClockScreen },
  { name: "BillSplitterScreen", component: BillSplitterScreen },
  { name: "BlogScreen", component: BlogScreen, title: "Blog" },
  { name: "BmiCalculatorScreen", component: BmiCalculatorScreen },
  { name: "CalculatorScreen", component: CalculatorScreen },
  { name: "CalendarScreen", component: CalendarScreen },
  { name: "CompassScreen", component: CompassScreen },
  { name: "EmojiPickerScreen", component: EmojiPickerScreen },
  { name: "JournalScreen", component: JournalScreen, title: "Add" },
  { name: "NotesScreen", component: NotesScreen },
  {
    name: "OTPGeneratorValidatorScreen",
    component: OTPGeneratorValidatorScreen,
    title: "OTP Generator",
  },
  { name: "PasswordGeneratorScreen", component: PasswordGeneratorScreen },
  { name: "ProfileScreen", component: ProfileScreen },
  { name: "QRCodeGeneratorScreen", component: QRCodeGeneratorScreen },
  { name: "SettingsScreen", component: SettingsScreen },
  { name: "StopwatchScreen", component: StopwatchScreen },
  { name: "TermsOfServiceScreen", component: TermsOfServiceScreen },
  { name: "TextEditorScreen", component: TextEditorScreen },
  { name: "TodoScreen", component: TodoScreen, title: "To-Do" },
  { name: "TypingSpeedMonitorScreen", component: TypingSpeedMonitorScreen },
  { name: "VotingScreen", component: VotingScreen },
  { name: "MapsScreen", component: MapsScreen },
  { name: "NativeCalendarScreen", component: NativeCalendarScreen },
  { name: "BatteryScreen", component: BatteryScreen },
  { name: "PrintScreen", component: PrintScreen },
  { name: "SupportScreen", component: SupportScreen },
  { name: "SnakeScreen", component: SnakeScreen, title: "Snake" },
];

// Finale Screens-Liste mit Auto-Titel und Validierung
export const screens = rawScreens.map((screen, idx) => {
  if (!screen?.component && __DEV__) {
    console.warn(
      `[screens.jsx] Fehlende Komponente bei "${screen?.name}" @${idx}`
    );
  }
  return {
    ...screen,
    title: screen.title || toReadableTitle(screen.name),
  };
});
