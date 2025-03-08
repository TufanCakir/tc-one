// src/navigation/screens.js
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import CalendarScreen from "../screens/CalendarScreen";
import EmojiPickerScreen from "../screens/EmojiPickerScreen";
import NewsScreen from "../screens/NewsScreen";
import NotesScreen from "../screens/NotesScreen";
import PasswordGeneratorScreen from "../screens/PasswordGeneratorScreen";
import RandomNumberScreen from "../screens/RandomNumberScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import TodoScreen from "../screens/TodoScreen";
import StopwatchScreen from "../screens/StopwatchScreen";
import OTPGeneratorValidatorScreen from "../screens/OTPGeneratorValidatorScreen";
import DevToolsScreen from "../screens/DevToolsScreen";
import ProfilScreen from "../screens/ProfilScreen";
import MiniGamesScreen from "../screens/MiniGamesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Snake from "../games/Snake";
import RockPaperScissors from "../games/RockPaperScissors";
import NumberGuessing from "../games/NumberGuessing";
import TapCircle from "../games/TapCircle";
import FallingCircles from "../games/FallingCircles";
import GardientTapChallenge from "../games/GardientTapChallenge";
import BasicsScreen from "../devToools/BasicsScreen";
import ShopScreen from "../screens/ShopScreen";
import BackgroundSelectionScreen from "../screens/BackgroundSelectionScreen";

// Array für eine kompaktere Struktur
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
  { name: "NewsScreen", component: NewsScreen, title: "News" },
  { name: "NotesScreen", component: NotesScreen, title: "Notes" },
  {
    name: "PasswordGeneratorScreen",
    component: PasswordGeneratorScreen,
    title: "Password Generator",
  },
  {
    name: "RandomNumberScreen",
    component: RandomNumberScreen,
    title: "Random Number",
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
  { name: "DevToolsScreen", component: DevToolsScreen, title: "Dev Tools" },
  { name: "ProfilScreen", component: ProfilScreen, title: "Profile" },
  { name: "MiniGamesScreen", component: MiniGamesScreen, title: "Mini Games" },
  { name: "SettingsScreen", component: SettingsScreen, title: "Settings" },
  { name: "Snake", component: Snake, title: "Snake" },
  {
    name: "RockPaperScissors",
    component: RockPaperScissors,
    title: "Rock Paper Scissors",
  },
  {
    name: "NumberGuessing",
    component: NumberGuessing,
    title: "Number Guessing",
  },
  { name: "TapCircle", component: TapCircle, title: "Tap Circle" },
  {
    name: "FallingCircles",
    component: FallingCircles,
    title: "Falling Circles",
  },
  {
    name: "GardientTapChallenge",
    component: GardientTapChallenge,
    title: "Gradient Tap Challenge",
  },
  { name: "BasicsScreen", component: BasicsScreen, title: "Basics" },
  { name: "ShopScreen", component: ShopScreen, title: "Shop" },
  {
    name: "BackgroundSelectionScreen",
    component: BackgroundSelectionScreen,
    title: "Background Selection",
  },
];
