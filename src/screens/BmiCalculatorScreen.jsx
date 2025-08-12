import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

const BmiCalculatorScreen = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const validateForm = () => {
    if (!age || !height || !weight || !gender) {
      alert("All fields are required!");
    } else {
      countBmi();
    }
  };

  const countBmi = () => {
    const bmi = (parseFloat(weight) / (parseFloat(height) / 100) ** 2).toFixed(
      2
    );
    let result = "";
    if (bmi < 18.5) result = "Underweight";
    else if (bmi <= 24.9) result = "Healthy";
    else if (bmi <= 29.9) result = "Overweight";
    else if (bmi <= 34.9) result = "Obese";
    else result = "Extremely obese";

    setBmiResult({ bmi, result });
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
  };

  const openLinkedIn = () => {
    Linking.openURL("https://www.linkedin.com/in/tufan-cakir");
  };

  const openWHO = () => {
    Linking.openURL(
      "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#000000", "#ffffff"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.header}>BMI Calculator</Text>
          <View style={styles.form}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your age"
                placeholderTextColor="#ccc"
                onChangeText={setAge}
                value={age}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your height"
                placeholderTextColor="#ccc"
                onChangeText={setHeight}
                value={height}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your weight"
                placeholderTextColor="#ccc"
                onChangeText={setWeight}
                value={weight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "male" && styles.selectedGender,
                ]}
                onPress={() => setGender("male")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "male" && styles.selectedGenderText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "female" && styles.selectedGender,
                ]}
                onPress={() => setGender("female")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "female" && styles.selectedGenderText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={validateForm}
            >
              <Text style={styles.submitButtonText}>Calculate BMI</Text>
            </TouchableOpacity>

            {bmiResult && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>BMI:</Text>
                <Text style={styles.resultText}>{bmiResult.bmi}</Text>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultText}>{bmiResult.result}</Text>

                {/* WHO Link */}
                <TouchableOpacity style={styles.whoButton} onPress={openWHO}>
                  <Text style={styles.whoButtonText}>Learn more (WHO)</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  form: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#fff",
  },
  genderText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  selectedGenderText: { color: "#fff" },
  submitButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  submitButtonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  resultContainer: { marginTop: 20, alignItems: "center" },
  resultLabel: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  resultText: { fontSize: 16, color: "#fff", marginBottom: 5 },
  whoButton: {
    marginTop: 10,
    backgroundColor: "#1E90FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  whoButtonText: { color: "#fff", fontWeight: "bold" },
  footerWrapper: { position: "absolute", bottom: 0, width: "100%" },
});

export default BmiCalculatorScreen;
