// src/navigation/screens.js
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

// ❗ optional fallback (robust gegen Fehlimport oder leeres Array)
export const screens = [
  { name: "StartScreen", component: StartScreen, title: "Start" },
  { name: "HomeScreen", component: HomeScreen, title: "Home" },
  {
    name: "CalculatorScreen",
    component: CalculatorScreen,
    title: "Calculator",
  },
  { name: "CalendarScreen", component: CalendarScreen, title: "Calendar" },
  {
    name: "EmojiPickerScreen",
    component: EmojiPickerScreen,
    title: "Emoji Picker",
  },
  { name: "NotesScreen", component: NotesScreen, title: "Notes" },
  {
    name: "PasswordGeneratorScreen",
    component: PasswordGeneratorScreen,
    title: "Password Generator",
  },

  {
    name: "TermsOfServiceScreen",
    component: TermsOfServiceScreen,
    title: "Terms of Service",
  },
  { name: "TodoScreen", component: TodoScreen, title: "To-Do" },
  { name: "StopwatchScreen", component: StopwatchScreen, title: "Stopwatch" },
  {
    name: "OTPGeneratorValidatorScreen",
    component: OTPGeneratorValidatorScreen,
    title: "OTP Generator",
  },
  { name: "SettingsScreen", component: SettingsScreen, title: "Settings" },
  {
    name: "QRCodeGeneratorScreen",
    component: QRCodeGeneratorScreen,
    title: "QR Code Generator",
  },
  { name: "VotingScreen", component: VotingScreen, title: "Voting" },
  {
    name: "BmiCalculatorScreen",
    component: BmiCalculatorScreen,
    title: "BMI Calculator",
  },
  {
    name: "BillSplitterScreen",
    component: BillSplitterScreen,
    title: "Bill Splitter",
  },
  {
    name: "TextEditorScreen",
    component: TextEditorScreen,
    title: "Text Editor",
  },
  {
    name: "BlogScreen",
    component: BlogScreen,
    title: "Blogr",
  },
  {
    name: "CompassScreen",
    component: CompassScreen,
    title: "Compass",
  },
  {
    name: "AlarmClockScreen",
    component: AlarmClockScreen,
    title: "Alarm Clock",
  },
  {
    name: "TypingSpeedMonitorScreen",
    component: TypingSpeedMonitorScreen,
    title: "Typing Speed Monitor",
  },
  {
    name: "JournalScreen",
    component: JournalScreen,
    title: "Add",
  },
  {
    name: "ProfileScreen",
    component: ProfileScreen,
    title: "Profile",
  },
];
