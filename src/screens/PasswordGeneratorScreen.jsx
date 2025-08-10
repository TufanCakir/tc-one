// src/screens/PasswordGeneratorScreen.jsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import styles from "../styles/PasswordGeneratorStyles";
import Footer from "../components/Footer";

export default function PasswordGeneratorScreen() {
  const {
    password,
    passwordLength,
    setPasswordLength,
    useSymbols,
    setUseSymbols,
    useNumbers,
    setUseNumbers,
    useLowerCase,
    setUseLowerCase,
    useUpperCase,
    setUseUpperCase,
    successMessage,
    generatePassword,
    copyToClipboard,
  } = usePasswordGenerator();

  const ToggleSwitch = ({ label, value, onChange }) => (
    <View style={styles.switchContainer}>
      <Switch value={value} onValueChange={onChange} />
      <Text style={styles.switchLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Password Length Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password Length</Text>
            <TextInput
              keyboardType="numeric"
              value={passwordLength}
              onChangeText={setPasswordLength}
              style={styles.input}
              maxLength={2}
            />
          </View>

          {/* Toggles */}
          <ToggleSwitch
            label="Symbols"
            value={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          <ToggleSwitch
            label="Numbers"
            value={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          <ToggleSwitch
            label="Lowercase Letters"
            value={useLowerCase}
            onChange={() => setUseLowerCase(!useLowerCase)}
          />
          <ToggleSwitch
            label="Uppercase Letters"
            value={useUpperCase}
            onChange={() => setUseUpperCase(!useUpperCase)}
          />

          {/* Generate Password Button */}
          <TouchableOpacity onPress={generatePassword} activeOpacity={0.85}>
            <LinearGradient
              colors={["#000000", "#ffffff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Generate Password</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Display Generated Password */}
          {password !== "" && (
            <View style={styles.generatedContainer}>
              <Text style={styles.label}>Generated Password:</Text>
              <TextInput
                value={password}
                style={styles.generatedInput}
                editable={false}
              />
              <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.85}>
                <LinearGradient
                  colors={["#000000", "#ffffff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.copyButton}
                >
                  <Text style={styles.buttonText}>Copy</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Success Message */}
          {successMessage !== "" && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Footer */}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}
