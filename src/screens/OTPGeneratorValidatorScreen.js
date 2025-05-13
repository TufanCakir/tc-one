// src/components/OTPGeneratorValidatorScreen.js
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import useOTP from "../hooks/useOTP";
import styles from "../styles/OTPStyles";
import Footer from "../components/Footer";

const OTPGeneratorValidatorScreen = () => {
  const {
    otp,
    userInput,
    setUserInput,
    isValid,
    showOtpBox,
    generateOtp,
    validateOtp,
  } = useOTP();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.button} onPress={generateOtp}>
          <Text style={styles.buttonText}>Generate OTP</Text>
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
        <TouchableOpacity style={styles.button} onPress={validateOtp}>
          <Text style={styles.buttonText}>Validate OTP</Text>
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
};

export default OTPGeneratorValidatorScreen;
