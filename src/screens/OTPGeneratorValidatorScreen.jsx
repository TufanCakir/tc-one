// src/components/OTPGeneratorValidatorScreen.js
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useOTP from "../hooks/useOTP";
import styles from "../styles/OTPStyles";
import Footer from "../components/Footer";

export default function OTPGeneratorValidatorScreen() {
  const {
    otp,
    userInput,
    setUserInput,
    isValid,
    showOtpBox,
    generateOtp,
    validateOtp,
  } = useOTP();

  const gradientColors = ["#000000", "#ffffff"]; // Beispiel: Rot-Orange-Verlauf

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Generate OTP Button */}
        <TouchableOpacity onPress={generateOtp} activeOpacity={0.8}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Generate OTP</Text>
          </LinearGradient>
        </TouchableOpacity>

        {showOtpBox && (
          <View style={styles.otpBox}>
            <Text style={[styles.otp, { color: "black" }]}>{otp}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={userInput}
          onChangeText={setUserInput}
        />

        {/* Validate OTP Button */}
        <TouchableOpacity onPress={validateOtp} activeOpacity={0.8}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Validate OTP</Text>
          </LinearGradient>
        </TouchableOpacity>

        {isValid === true && <Text style={styles.validText}>Valid OTP</Text>}
        {isValid === false && (
          <Text style={styles.invalidText}>Invalid OTP</Text>
        )}
      </View>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
}
