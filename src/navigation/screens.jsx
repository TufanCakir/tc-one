// src/navigation/screens.jsx
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
import VideoPlayerScreen from "../screens/VideoPlayerScreen";
import MapsScreen from "../screens/MapsScreen";
import CalendarOneScreen from "../screens/CalendarOneScreen";
import ImagePickerScreen from "../screens/ImagePickerScreen";
import BatteryScreen from "../screens/BatteryScreen";
import PrintScreen from "../screens/PrintScreen";
import WebViewScreen from "../screens/WebViewScreen";
import GalleryScreen from "../screens/GalleryScreen";
import SmsScreen from "../screens/SmsScreen";
import LoginScreen from "../screens/LoginScreen";
import SupportScreen from "../screens/SupportScreen";

// Game Screens
import SnakeScreen from "../gameScreens/SnakeScreen";

export const screens = [
  { name: "LoginScreen", component: LoginScreen },
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
  { name: "VideoPlayerScreen", component: VideoPlayerScreen },
  { name: "MapsScreen", component: MapsScreen },
  { name: "CalendarOneScreen", component: CalendarOneScreen },
  { name: "ImagePickerScreen", component: ImagePickerScreen },
  { name: "BatteryScreen", component: BatteryScreen },
  { name: "PrintScreen", component: PrintScreen },
  { name: "WebViewScreen", component: WebViewScreen },
  { name: "GalleryScreen", component: GalleryScreen },
  { name: "SmsScreen", component: SmsScreen },
  { name: "SupportScreen", component: SupportScreen },
  { name: "SnakeScreen", component: SnakeScreen, title: "Snake" },
].map((screen) => ({
  ...screen,
  title:
    screen.title ||
    screen.name
      .replace("Screen", "")
      .replace(/([A-Z])/g, " $1")
      .trim(),
}));
