// src/components/PasswordGeneratorScreen.js
import React from "react";
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
            />
          </View>

          {/* Toggles für Passwort-Einstellungen */}
          <View style={styles.switchContainer}>
            <Switch
              value={useSymbols}
              onValueChange={() => setUseSymbols(!useSymbols)}
            />
            <Text style={styles.switchLabel}>Symbols</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={useNumbers}
              onValueChange={() => setUseNumbers(!useNumbers)}
            />
            <Text style={styles.switchLabel}>Numbers</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={useLowerCase}
              onValueChange={() => setUseLowerCase(!useLowerCase)}
            />
            <Text style={styles.switchLabel}>Lowercase Letters</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={useUpperCase}
              onValueChange={() => setUseUpperCase(!useUpperCase)}
            />
            <Text style={styles.switchLabel}>Uppercase Letters</Text>
          </View>

          {/* Generate Password Button */}
          <TouchableOpacity style={styles.button} onPress={generatePassword}>
            <Text style={styles.buttonText}>Generate Password</Text>
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
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <Text style={styles.buttonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Success Message */}
          {successMessage !== "" && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Footer />
    </View>
  );
}
